using Abp.Dependency;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class PageManager : ITransientDependency
    {
        public const string HomeName = "home";

        private IEfRepository<DefaultComponentData, int> _defaultDataRepository { get; set; }

        private IIEMemoryCache _cache { get; set; }

        private PageDataManager _pageDataManager { get; set; }

        public PageManager(IPageRepository pageRepository,
            IEfRepository<DefaultComponentData, int> defaultDataRepository,
            PageDataManager pageDataManager,
            IIEMemoryCache cache
            )
        {
            PageRepository = pageRepository;
            _defaultDataRepository = defaultDataRepository;
            _pageDataManager = pageDataManager;
            _cache = cache;
        }

        public IPageRepository PageRepository { get; }

        private string GetPageCacheName(string pageName) => $"PageManager_Page_{pageName}_";

        public PageBase GetPageForCache(string pageName)
        {
            return _cache.GetOrCreate<PageBase>(GetPageCacheName(pageName), cacheEntity => {

                cacheEntity.SlidingExpiration = TimeSpan.FromHours(1);

                cacheEntity.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);

                cacheEntity.SetPriority(CacheItemPriority.NeverRemove);

                PageRepository.NoTracking();
                var page = PageRepository.GetPageOfAllIncludes(pageName);
                PageRepository.Tracking();

                return page;
            });
        }

        // 使缓存失效
        public void SetPageInvalidForCache(string pageName)
        {
            _cache.Remove(GetPageCacheName(pageName));
        }

        public void AddPage(PageBase page)
        {
            if (PageRepository.GetAll().Any(e => e.Name == page.Name))
            {
                throw new UserFriendlyException($"已存在名为{page.Name}的页面，请重新命名");
            }

            PageRepository.Insert(page);
        }

        public void UpdatePage(PageBase page) 
        {
            PageRepository.Update(page);

            SetPageInvalidForCache(page.Name);
        }

        public void UpdateContentPagePermission(string name, ContentPagePeimissionCollection contentPagePeimissionCollection) 
        {
            var page = PageRepository.GetPageOfAllIncludes(name);

            if (page == null)
            {
                throw new UserFriendlyException("未找到页面");
            }

            if (!(page is ContentPage))
            {
                throw new UserFriendlyException("无法更改页面权限，请确保页面属于内容页");
            }

            var contentPage = (ContentPage)page;
            contentPage.ContentPagePeimissionCollection = contentPagePeimissionCollection;

            SetPageInvalidForCache(page.Name);
        }

        public void DeletePage(string name)
        {
            if (name.ToLower() == HomeName)
            {
                throw new UserFriendlyException("不能删除主页");
            }

            var page = PageRepository.GetPageOfAllIncludes(name);

            // 删除所有文章
            _pageDataManager.DeletePagePosts(page.Name);

            // 删除默认数据
            Expression<Func<DefaultComponentData, object>>[] propertySelectors = {
                e=>e.SingleDatas
            };
            var oldDatas = _defaultDataRepository.GetAllIncluding(propertySelectors).Where(e => e.PageId == page.Id).ToList();
            oldDatas.ForEach(item => {
                _defaultDataRepository.Delete(item);
            });

            // 删除页面
            PageRepository.Delete(page);

            SetPageInvalidForCache(page.Name);
        }

        public void UpdatePageComponentsAndDefaultComponentData(string name, List<PageComponentBase> pageComponents, List<DefaultComponentData> defaultComponentDatas)
        {
            var page = PageRepository.GetPageOfAllIncludes(name);
            page.PageComponents = new List<PageComponentBase>();

            foreach (var item in pageComponents) {
                page.PageComponents.Add(item);
            }

            Expression<Func<DefaultComponentData, object>>[] propertySelectors = {
                e=>e.SingleDatas
            };
            var oldDatas = _defaultDataRepository.GetAllIncluding(propertySelectors).Where(e => e.PageId == page.Id).ToList();
            oldDatas.ForEach(item=> {
                _defaultDataRepository.Delete(item);
            });

            defaultComponentDatas.ForEach(item =>
            {
                item.Page = page;
                _defaultDataRepository.Insert(item);
            });

            SetPageInvalidForCache(page.Name);
        }
    }
}
