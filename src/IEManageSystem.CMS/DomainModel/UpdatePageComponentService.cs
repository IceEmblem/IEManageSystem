using Abp.Dependency;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel
{
    public class UpdatePageComponentService : ITransientDependency
    {
        private PageManager _pageManager { get; }

        private PageComponentManager _pageComponentManager { get; }

        private ComponentDataManager _componentDataManager { get; }

        public UpdatePageComponentService(
            PageManager pageManager,
            PageComponentManager pageComponentManager,
            ComponentDataManager componentDataManager) 
        {
            _pageManager = pageManager;
            _pageComponentManager = pageComponentManager;
            _componentDataManager = componentDataManager;
        }

        public void UpdatePageComponents(PageBase page, List<PageComponent> pageComponents, List<DefaultComponentData> defaultComponentDatas, User user) 
        {
            page.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);

            _pageComponentManager.UpdatePageComponents(page, pageComponents);

            _componentDataManager.UpdateDefaultComponentData(page, defaultComponentDatas);
        }
    }
}
