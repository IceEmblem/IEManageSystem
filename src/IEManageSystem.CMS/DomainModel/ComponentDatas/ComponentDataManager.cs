using Abp.Dependency;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.ComponentDatas
{
    public class ComponentDataManager : ITransientDependency
    {
        private IIEMemoryCache _cache { get; }

        public IEfRepository<DefaultComponentData, int> DefaultComponentDataRepository { get; }

        public IEfRepository<ContentComponentData, int> ContentComponentDataRepository { get; }

        public ComponentDataManager(
            IIEMemoryCache cache,
            IEfRepository<DefaultComponentData, int> defaultDataRepository,
            IEfRepository<ContentComponentData, int> contentComponentDataRepository) 
        {
            _cache = cache;
            DefaultComponentDataRepository = defaultDataRepository;
            ContentComponentDataRepository = contentComponentDataRepository;
        }

        private string GetCacheName(string pageName) => $"ComponentDataManager_DefaultComponentDatas_{pageName}_";

        /// <summary>
        /// 从缓存获取页面对应的组件
        /// </summary>
        /// <param name="pageName"></param>
        /// <returns></returns>
        public List<DefaultComponentData> GetDefaultComponentsForCache(string pageName)
        {
            return _cache.GetOrCreate<List<DefaultComponentData>>(GetCacheName(pageName), cacheEntity => {

                cacheEntity.SlidingExpiration = TimeSpan.FromHours(1);

                cacheEntity.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);

                cacheEntity.SetPriority(CacheItemPriority.NeverRemove);

                DefaultComponentDataRepository.NoTracking();
                var componentDatas = DefaultComponentDataRepository.GetAllIncluding(e => e.SingleDatas).Where(e => e.Page.Name == pageName).ToList();
                DefaultComponentDataRepository.Tracking();

                return componentDatas;
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

        public void UpdateDefaultComponentData(PageBase page, List<DefaultComponentData> defaultComponentDatas) 
        {
            var oldDatas = DefaultComponentDataRepository.GetAllIncluding(e => e.SingleDatas).Where(e => e.PageId == page.Id).ToList();

            oldDatas.ForEach(item => {
                DefaultComponentDataRepository.Delete(item);
            });

            defaultComponentDatas.ForEach(item =>
            {
                item.Page = page;
                DefaultComponentDataRepository.Insert(item);
            });

            SetInvalidForCache(page.Name);
        }

        public void DeleteDefaultComponentData(PageBase page) 
        {
            var oldDatas = DefaultComponentDataRepository.GetAllIncluding(e=>e.SingleDatas).Where(e => e.PageId == page.Id).ToList();
            oldDatas.ForEach(item => {
                DefaultComponentDataRepository.Delete(item);
            });

            SetInvalidForCache(page.Name);
        }
    }
}
