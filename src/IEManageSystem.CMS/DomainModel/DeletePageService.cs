using Abp.Dependency;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel
{
    public class DeletePageService : ITransientDependency
    {
        private PageManager _pageManager { get; }

        private DeletePageDataService _deletePageDataService { get; }

        private PageComponentManager _pageComponentManager { get; }

        private ComponentDataManager _componentDataManager { get; }

        public DeletePageService(
            PageManager pageManager,
            DeletePageDataService deletePageDataService,
            PageComponentManager pageComponentManager,
            ComponentDataManager componentDataManager)
        {
            _pageManager = pageManager;
            _deletePageDataService = deletePageDataService;
            _pageComponentManager = pageComponentManager;
            _componentDataManager = componentDataManager;
        }

        public void DeletePage(PageBase page) 
        {
            // 删除页面
            _pageManager.DeletePage(page);

            // 删除所有文章
            _deletePageDataService.DeletePagePosts(page);

            // 删除组件
            _pageComponentManager.DeletePageComponents(page);

            // 删除默认数据
            _componentDataManager.DeleteDefaultComponentData(page);
        }
    }
}
