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

            page.PageDatas.Remove(pageData);
        }

        public void SetContentComponentDatas(string pageName, string pageDataName, List<ContentComponentData> contentComponentDatas)
        {
            PageData pageData = GetPageDataIncludeAllProperty(pageName, pageDataName);

            pageData.ContentComponentDatas = contentComponentDatas;
        }

        public PageData GetPageDataIncludeAllProperty(string pageName, string pageDataName)
        {
            var page = PageRepository.ThenInclude(e => e.PageDatas, e => e.ContentComponentDatas).FirstOrDefault(e => e.Name == pageName);

            PageData pageData = null;
            if (page is StaticPage)
            {
                pageData = page.PageDatas.FirstOrDefault();
            }
            else
            {
                pageData = page.PageDatas.FirstOrDefault(e => e.Name == pageDataName);
            }

            return pageData;
        }
    }
}
