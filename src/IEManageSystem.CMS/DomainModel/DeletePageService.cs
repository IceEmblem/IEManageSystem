using Abp.Dependency;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
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

        private ComponentDataManager _componentDataManager { get; }

        public DeletePageService(
            PageManager pageManager,
            DeletePageDataService deletePageDataService,
            ComponentDataManager componentDataManager)
        {
            _pageManager = pageManager;
            _deletePageDataService = deletePageDataService;
            _componentDataManager = componentDataManager;
        }

        public void DeletePage(string pageName) 
        {
            // 删除页面
            _pageManager.DeletePage(pageName);

            // 删除所有文章
            _deletePageDataService.DeletePagePosts(pageName);
        }
    }
}
