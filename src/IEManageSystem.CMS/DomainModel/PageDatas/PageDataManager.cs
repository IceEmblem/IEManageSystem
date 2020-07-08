using Abp.Dependency;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
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

        public IEfRepository<ContentComponentData, int> ComponentDataRepository { get; set; }

        public IPageRepository PageRepository { get; }

        public PageDataManager(
            IEfRepository<PageData, int> repository,
            IPageRepository pageRepository)
        {
            PostRepository = repository;
            PageRepository = pageRepository;
        }

        public void AddPageData(string pageName, PageData pageData)
        {
            if (PostRepository.Count(e => e.Name == pageData.Name && e.Page.Name == pageName) > 0) 
            {
                throw new UserFriendlyException("文章名称已重复");
            }

            var page = PageRepository.GetAll().OfType<ContentPage>().FirstOrDefault(e => e.Name == pageName);

            if (page == null) {
                throw new UserFriendlyException("找不到要添加的文章页面");
            }

            pageData.Page = page;

            PostRepository.Insert(pageData);
        }

        public void UpdatePageData(string pageName, PageData pageData) {
            var posts = PostRepository.GetAllList(e=>e.Name == pageData.Name && e.Page.Name == pageName);
            if (posts.Count > 1 || (posts.Count == 1 && posts[0].Id != pageData.Id)) {
                throw new UserFriendlyException("文章名称已重复");
            }

            PostRepository.Update(pageData);
        }

        public void DeletePageData(string pageName, string pageDataName)
        {
            var pageData = PostRepository.GetAllIncluding(new Expression<Func<PageData, object>>[] {
                    e=>e.Tags
                }).FirstOrDefault(e => e.Name == pageDataName && e.Page.Name == pageName);

            if (pageData == null)
            {
                throw new UserFriendlyException("找不到要删除的文章");
            }

            Expression<Func<ContentComponentData, object>>[] propertySelectors = {
                e=>e.SingleDatas
            };
            ComponentDataRepository.GetAllIncluding(propertySelectors).Where(e => e.PageDataId == pageData.Id).ToList();
            ComponentDataRepository.Delete(item => item.PageDataId == pageData.Id);

            PostRepository.Delete(pageData);
        }

        /// <summary>
        /// 删除页面的所有文章
        /// </summary>
        public void DeletePagePosts(string pageName) 
        {
            IEnumerable<int> postIds = PostRepository.GetAll().Where(e => e.Page.Name == pageName).Select(e => e.Id);

            Expression<Func<ContentComponentData, object>>[] propertySelectors = {
                e=>e.SingleDatas
            };
            ComponentDataRepository.GetAllIncluding(propertySelectors).Where(e => e.PageDataId.HasValue && postIds.Contains(e.PageDataId.Value)).ToList();
            ComponentDataRepository.Delete(item => item.PageDataId.HasValue && postIds.Contains(item.PageDataId.Value));

            PostRepository.Delete(e=> postIds.Contains(e.Id));
        }

        public void SetContentComponentDatas(string pageName, string pageDataName, List<ContentComponentData> contentComponentDatas)
        {
            PageData pageData = PostRepository.FirstOrDefault(e => e.Page.Name == pageName && e.Name == pageDataName);

            Expression<Func<ContentComponentData, object>>[] propertySelectors = { 
                e=>e.SingleDatas
            };
            ComponentDataRepository.GetAllIncluding(propertySelectors).Where(e=>e.PageDataId == pageData.Id).ToList();
            ComponentDataRepository.Delete(item => item.PageDataId == pageData.Id);

            contentComponentDatas.ForEach(item =>
            {
                item.PageData = pageData;
                ComponentDataRepository.Insert(item);
            });
        }
    }
}
