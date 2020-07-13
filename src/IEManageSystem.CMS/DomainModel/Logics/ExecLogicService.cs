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
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Repositorys;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public class ExecLogicService : IExecLogicService
    {
        private IActuatorFactory _actuatorFactory { get; set; }

        private PageManager _pageManager { get; set; }

        private PageDataManager _pageDataManager { get; set; }

        private IEfRepository<ContentComponentData, int> _componentDataRepository { get; set; }

        private UserManager _userManager { get; set; }

        public ExecLogicService(
            IActuatorFactory actuatorFactory,
            PageManager pageManager,
            PageDataManager pageDataManager,
            IEfRepository<ContentComponentData, int> componentDataRepository,
            UserManager userManager) 
        {
            _actuatorFactory = actuatorFactory;

            _pageManager = pageManager;

            _pageDataManager = pageDataManager;

            _componentDataRepository = componentDataRepository;

            _userManager = userManager;
        }

        public void Exec(
            Logic logic,
            string pageName,
            string pageComponentBaseSign,
            string pageDataName,
            string contentComponentDataSign,
            int userId,
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
                componentData = _componentDataRepository.GetAllIncluding(e => e.SingleDatas).FirstOrDefault(e => e.PageDataId == post.Id && e.Sign == contentComponentDataSign);
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

            User user = null;
            if (userId > 0) {
                _userManager.UserRepository.NoTracking();
                user = _userManager.UserRepository.FirstOrDefault(userId);
                _userManager.UserRepository.Tracking();
            }
            

            actuator.Exec(componentData, pageComponent, post, page, user, request);
        }
    }
}
