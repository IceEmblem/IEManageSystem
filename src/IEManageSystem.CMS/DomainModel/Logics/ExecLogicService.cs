using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Repositorys;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public class ExecLogicService : IExecLogicService
    {
        private IActuatorFactory _actuatorFactory { get; set; }

        private PageManager _pageManager { get; set; }

        private PageDataManager _pageDataManager { get; set; }

        private IEfRepository<ContentComponentData, int> _componentDataRepository { get; set; }

        public ExecLogicService(
            IActuatorFactory actuatorFactory,
            PageManager pageManager,
            PageDataManager pageDataManager,
            IEfRepository<ContentComponentData, int> componentDataRepository) 
        {
            _actuatorFactory = actuatorFactory;

            _pageManager = pageManager;

            _pageDataManager = pageDataManager;

            _componentDataRepository = componentDataRepository;
        }

        public void Exec(
            Logic logic,
            string pageName,
            string pageComponentBaseSign,
            string pageDataName,
            string contentComponentDataSign,
            string request)
        {
            var page = _pageManager.GetPageForCache(pageName);

            if (page == null) 
            {
                throw new UserFriendlyException($"指定的页面{pageName}不存在");
            }

            var pageComponent = page.GetPageComponentForSign(pageComponentBaseSign);

            if (pageComponent == null)
            {
                throw new UserFriendlyException($"指定的组件{pageComponentBaseSign}不存在");
            }

            var post = _pageDataManager.PostRepository.GetAllIncluding(e => e.Tags).FirstOrDefault(e => e.Name == pageDataName);

            ContentComponentData componentData = null;
            if (post != null) 
            {
                componentData = _componentDataRepository.GetAllIncluding(e => e.SingleDatas).FirstOrDefault(e => e.PageDataId == post.Id && e.Sign == pageComponentBaseSign);
            }

            var actuator = _actuatorFactory.GetActuator(logic.Name);

            if (actuator == null) {
                try
                {
                    _actuatorFactory.Register(logic.Name, logic.Code);
                }
                catch (Exception e) 
                {
                    throw new UserFriendlyException(e.Message);
                }

                actuator = _actuatorFactory.GetActuator(logic.Name);
            }
            

            actuator.Exec(componentData, pageComponent, post, page, request);
        }
    }
}
