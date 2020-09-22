using Abp.Dependency;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.ComponentDatas
{
    public class ComponentDataManager : ITransientDependency
    {
        private IIEMemoryCache _cache { get; }

        public IEfRepository<ComponentData, int> ComponentDataRepository { get; }

        public IQueryable<DefaultComponentData> DefaultComponentDataRepository { get { return ComponentDataRepository.GetAll().OfType<DefaultComponentData>(); } }

        public IQueryable<ContentComponentData> ContentComponentDataRepository { get { return ComponentDataRepository.GetAll().OfType<ContentComponentData>(); } }

        public ComponentDataManager(
            IIEMemoryCache cache,
            IEfRepository<ComponentData, int> componentDataRepository) 
        {
            _cache = cache;
            ComponentDataRepository = componentDataRepository;
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

                ComponentDataRepository.NoTracking();
                var componentDatas = ComponentDataRepository.GetAllIncluding(e => e.SingleDatas).OfType<DefaultComponentData>().Where(e => e.Page.Name == pageName).ToList();
                ComponentDataRepository.Tracking();

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
            var oldDatas = ComponentDataRepository.GetAllIncluding(e => e.SingleDatas).OfType<DefaultComponentData>().Where(e => e.PageId == page.Id).ToList();

            oldDatas.ForEach(item => {
                ComponentDataRepository.Delete(item);
            });

            defaultComponentDatas.ForEach(item =>
            {
                item.Page = page;
                ComponentDataRepository.Insert(item);
            });

            SetInvalidForCache(page.Name);
        }

        public void UpdateContentComponentData(PageData pageData, List<ContentComponentData> contentComponentDatas)
        {
            var oldDatas = ComponentDataRepository.GetAllIncluding(e => e.SingleDatas).OfType<ContentComponentData>().Where(e => e.PageDataId == pageData.Id).ToList();

            oldDatas.ForEach(item => {
                ComponentDataRepository.Delete(item);
            });

            contentComponentDatas.ForEach(item =>
            {
                item.PageData = pageData;
                ComponentDataRepository.Insert(item);
            });
        }

        public void DeleteDefaultComponentData(PageBase page) 
        {
            var oldDatas = ComponentDataRepository.GetAllIncluding(e=>e.SingleDatas).OfType<DefaultComponentData>().Where(e => e.PageId == page.Id).ToList();

            oldDatas.ForEach(item => {
                ComponentDataRepository.Delete(item);
            });

            SetInvalidForCache(page.Name);
        }

        public void DeleteContentComponentData(PageData post) 
        {
            var oldDatas = ComponentDataRepository.GetAllIncluding(e => e.SingleDatas).OfType<ContentComponentData>().Where(e => e.PageDataId == post.Id).ToList();

            oldDatas.ForEach(item => {
                ComponentDataRepository.Delete(item);
            });
        }
    }
}
