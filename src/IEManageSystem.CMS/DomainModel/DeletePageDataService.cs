using Abp.Dependency;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Repositorys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.CMS.DomainModel
{
    public class DeletePageDataService : ITransientDependency
    {
        private ComponentDataManager _componentDataManager { get; set; }

        private PageDataManager _pageDataManager { get; set; }

        public DeletePageDataService(
            ComponentDataManager componentDataManager,
            PageDataManager pageDataManager) 
        {
            _componentDataManager = componentDataManager;
            _pageDataManager = pageDataManager;
        }

        public void DeletePageData(PageData pageData) {
            _componentDataManager.DeleteContentComponentData(pageData);

            _pageDataManager.DeletePageData(pageData);
        }

        public void DeletePageDataOfCreator(PageData pageData, User user)
        {
            _componentDataManager.DeleteContentComponentData(pageData);

            _pageDataManager.DeletePageDataOrCreator(pageData, user);
        }

        public void DeletePagePosts(PageBase page)
        {
            var posts = _pageDataManager.PostRepository.GetAll().Where(e => e.PageId == page.Id).ToList();

            posts.ForEach(item => {
                _componentDataManager.DeleteContentComponentData(item);
                _pageDataManager.DeletePageData(item);
            });
        }
    }
}
