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
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Repositorys;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public class ExecLogicService : IExecLogicService
    {
        private IActuatorFactory _actuatorFactory { get; }

        private PageManager _pageManager { get; }

        private PageDataManager _pageDataManager { get; }

        private ComponentDataManager _componentDataManager { get; }

        private PageComponentManager _pageComponentManager { get; }

        private UserManager _userManager { get; }

        public ExecLogicService(
            IActuatorFactory actuatorFactory,
            PageManager pageManager,
            PageDataManager pageDataManager,
            PageComponentManager pageComponentManager,
            ComponentDataManager componentDataManager,
            UserManager userManager) 
        {
            _actuatorFactory = actuatorFactory;

            _pageManager = pageManager;

            _pageDataManager = pageDataManager;

            _pageComponentManager = pageComponentManager;

            _componentDataManager = componentDataManager;

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

            var pageComponent = _pageComponentManager.GetPageComponentsForCache(page.Name).FirstOrDefault(e => e.Sign == pageComponentBaseSign);

            if (pageComponent == null)
            {
                throw new UserFriendlyException($"指定的组件{pageComponentBaseSign}不存在");
            }

            var post = _pageDataManager.PostRepository.GetAllIncluding(e => e.Tags).FirstOrDefault(e => e.Name == pageDataName);

            ContentComponentData componentData = null;
            if (post != null) 
            {
                componentData = _componentDataManager.ComponentDataRepository.GetAllIncluding(e => e.SingleDatas).OfType<ContentComponentData>().FirstOrDefault(e => e.PageDataId == post.Id && e.Sign == contentComponentDataSign);
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

            try
            {
                actuator.Exec(componentData, pageComponent, post, page, user, request);
            }
            catch (Exception ex) {
                throw ex.InnerException;
            }
        }
    }
}
