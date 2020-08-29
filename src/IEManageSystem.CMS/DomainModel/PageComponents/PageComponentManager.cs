using Abp.Dependency;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageComponents
{
    public class PageComponentManager : ITransientDependency
    {
        private IIEMemoryCache _cache { get; }

        public IPageComponentRepository PageComponentRepository { get; }

        public PageComponentManager(
            IIEMemoryCache cache,
            IPageComponentRepository pageComponentRepository) 
        {
            _cache = cache;
            PageComponentRepository = pageComponentRepository;
        }

        private string GetCacheName(string pageName) => $"PageComponentManager_PageComponents_{pageName}_";

        /// <summary>
        /// 从缓存获取页面对应的组件
        /// </summary>
        /// <param name="pageName"></param>
        /// <returns></returns>
        public List<PageComponent> GetPageComponentsForCache(string pageName)
        {
            return _cache.GetOrCreate<List<PageComponent>>(GetCacheName(pageName), cacheEntity => {

                cacheEntity.SlidingExpiration = TimeSpan.FromHours(1);

                cacheEntity.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);

                cacheEntity.SetPriority(CacheItemPriority.NeverRemove);

                PageComponentRepository.NoTracking();
                var components = PageComponentRepository.GetPageComponentOfAllIncludesForPageName(pageName).ToList();
                PageComponentRepository.Tracking();

                return components;
            });
        }

        /// <summary>
        /// 使缓存失效
        /// </summary>
        /// <param name="pageName"></param>
        public void SetInvalidForCache(string pageName)
        {
            _cache.Remove(GetCacheName(pageName));
        }

        public void UpdatePageComponents(PageBase page, List<PageComponent> pageComponents) 
        {
            var oldPageComponents = PageComponentRepository.GetPageComponentOfAllIncludesForPageName(page.Name).ToList();
            oldPageComponents.ForEach(item => {
                PageComponentRepository.Delete(item);
            });

            pageComponents.ForEach(item =>
            {
                item.Page = page;
                PageComponentRepository.Insert(item);
            });

            SetInvalidForCache(page.Name);
        }

        public void DeletePageComponents(PageBase page) {
            var pageComponents = PageComponentRepository.GetPageComponentOfAllIncludesForPageName(page.Name).ToList();

            pageComponents.ForEach(item =>
            {
                PageComponentRepository.Delete(item);
            });

            SetInvalidForCache(page.Name);
        }
    }
}
