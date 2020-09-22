using Abp.Dependency;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Repositorys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageDatas
{
    public class PageDataManager : ITransientDependency
    {
        public IEfRepository<PageData, int> PostRepository { get; set; }

        public PageDataManager(
            IEfRepository<PageData, int> repository)
        {
            PostRepository = repository;
        }

        public void AddPageData(PageBase page, PageData pageData, User user)
        {
            if (PostRepository.Count(e => e.Name == pageData.Name && e.Page.Name == page.Name) > 0) 
            {
                throw new UserFriendlyException("文章名称已重复");
            }

            pageData.Page = page;
            pageData.Creator = new EntityEdit(user.Id, user.Name, user.HeadSculpture);
            pageData.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);

            PostRepository.Insert(pageData);
        }

        /// <summary>
        /// 更新文章最后修改者
        /// </summary>
        public void UpdatePageDataLastUpdater(PageData pageData, User user) 
        {
            pageData.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);
        }

        public void UpdatePageData(PageBase page, PageData pageData, User user) {
            var posts = PostRepository.GetAllList(e=>e.Name == pageData.Name && e.Page.Name == page.Name);
            if (posts.Count > 1 || (posts.Count == 1 && posts[0].Id != pageData.Id)) 
            {
                throw new UserFriendlyException("文章名称已重复");
            }

            pageData.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);

            PostRepository.Update(pageData);
        }

        public void UpdatePageDataOfCreator(PageBase page, PageData pageData, User user)
        {
            if (pageData.Creator.EditorId != user.Id) {
                throw new UserFriendlyException("你不是文章的创建者，没有权限修改文章");
            }

            UpdatePageData(page, pageData, user);
        }

        public void DeletePageData(PageData pageData)
        {
            PostRepository.GetAllIncluding(e => e.Tags).First(e => e.Id == pageData.Id);

            PostRepository.Delete(pageData);
        }

        public void DeletePageDataOrCreator(PageData pageData, User user)
        {
            if (pageData.Creator.EditorId != user.Id)
            {
                throw new UserFriendlyException("你不是文章的创建者，没有权限删除文章");
            }

            DeletePageData(pageData);
        }
    }
}
