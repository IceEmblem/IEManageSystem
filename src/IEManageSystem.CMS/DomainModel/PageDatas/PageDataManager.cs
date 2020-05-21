using Abp.Dependency;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Repositorys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageDatas
{
    public class PageDataManager : ITransientDependency
    {
        public IEfRepository<PageData, int> Repository { get; set; }

        public IPageRepository PageRepository { get; }

        public PageDataManager(
            IEfRepository<PageData, int> repository,
            IPageRepository pageRepository)
        {
            Repository = repository;
            PageRepository = pageRepository;
        }

        public void AddPageData(string name, PageData pageData)
        {
            var page = PageRepository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == name);
            if (page is StaticPage)
            {
                throw new UserFriendlyException("无法为单页添加文章");
            }

            ((ContentPage)page).AddPageData(pageData);
        }

        public void UpdatePageData(PageData pageData) {
            var posts = Repository.GetAllList(e=>e.Name == pageData.Name);
            if (posts.Count > 1 || (posts.Count == 1 && posts[0].Id != pageData.Id)) {
                throw new UserFriendlyException("文章名称已重复");
            }

            Repository.Update(pageData);
        }

        public void DeletePageData(string name, string pageDataName)
        {
            var page = PageRepository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == name);
            if (page is StaticPage)
            {
                throw new UserFriendlyException("无法删除单页文章");
            }

            var pageData = page.PageDatas.FirstOrDefault(e => e.Name == pageDataName);
            if (pageData == null)
            {
                throw new UserFriendlyException("找不到要删除的文章");
            }

            Repository.ThenInclude(e => e.ContentComponentDatas, e => e.SingleDatas).FirstOrDefault(e=>e.Id == pageData.Id);

            page.PageDatas.Remove(pageData);
        }

        public void SetContentComponentDatas(string pageName, string pageDataName, List<ContentComponentData> contentComponentDatas)
        {
            PageData pageData = GetPageDataIncludeAllProperty(pageName, pageDataName);

            pageData.ContentComponentDatas = contentComponentDatas;
        }

        public PageData GetPageDataIncludeAllProperty(string pageName, string pageDataName)
        {
            if (string.IsNullOrWhiteSpace(pageDataName))
            {
                var page = PageRepository.GetPageIncludePageDataAllProperty(pageName);
                return page.PageDatas.FirstOrDefault();
            }
            else 
            {
                return Repository.ThenInclude(e => e.ContentComponentDatas, e => e.SingleDatas).FirstOrDefault(e=>e.Page.Name == pageName && e.Name == pageDataName);
            }
        }
    }
}
