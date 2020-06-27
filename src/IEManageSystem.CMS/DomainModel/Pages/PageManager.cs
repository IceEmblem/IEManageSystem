using Abp.Dependency;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Entitys.Authorization.Permissions;
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

        /// <summary>
        /// 从缓存获取页面
        /// </summary>
        /// <param name="pageName"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 使缓存失效
        /// </summary>
        /// <param name="pageName"></param>
        public void SetPageInvalidForCache(string pageName)
        {
            _cache.Remove(GetPageCacheName(pageName));
        }

        /// <summary>
        /// 获取具有管理文章权限的页面
        /// </summary>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public IEnumerable<ContentPage> GetPagesForManagePermission(IEnumerable<Permission> permissions) 
        {
            IEnumerable<int> permissionIds = permissions.Select(e => e.Id);

            return PageRepository.GetAll().OfType<ContentPage>().Where(e => e.ContentPagePermissionCollection.ManagePermissions.Any(e => permissionIds.Contains(e.Id)));
        }

        /// <summary>
        /// 获取具有查询文章权限的页面
        /// </summary>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public IEnumerable<ContentPage> GetPagesForQueryPermission(IEnumerable<Permission> permissions) 
        {
            IEnumerable<int> permissionIds = permissions.Select(e => e.Id);

            return PageRepository.GetAll().OfType<ContentPage>().Where(e => 
                e.ContentPagePermissionCollection.ManagePermissions.Any(e => permissionIds.Contains(e.Id))
                || e.ContentPagePermissionCollection.IsEnableQueryPermission == false
                || e.ContentPagePermissionCollection.QueryPermissions.Any(e => permissionIds.Contains(e.Id))
            );
        }

        /// <summary>
        /// 是否可以访问该页面的文章
        /// </summary>
        /// <returns></returns>
        public bool IsCanQueryPost(string pageName, IEnumerable<Permission> permissions) 
        {
            var page = GetPageForCache(pageName);

            if (!(page is ContentPage)) {
                throw new UserFriendlyException($"页面{pageName}不是文章页面");
            }

            var contentPage = (ContentPage)page;
            foreach (var item in permissions) {
                if (contentPage.ContentPagePermissionCollection.IsCanQueryPost(item)) 
                {
                    return true;
                }
            };

            return false;
        }

        /// <summary>
        /// 是否可以管理该页面的文章
        /// </summary>
        /// <param name="pageName"></param>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public bool IsCanManagePost(string pageName, IEnumerable<Permission> permissions) 
        {
            var page = GetPageForCache(pageName);

            if (!(page is ContentPage))
            {
                throw new UserFriendlyException($"页面{pageName}不是文章页面");
            }

            var contentPage = (ContentPage)page;
            foreach (var item in permissions)
            {
                if (contentPage.ContentPagePermissionCollection.IsCanManagePost(item))
                {
                    return true;
                }
            };

            return false;
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

        public void UpdateContentPagePermission(string name, ContentPagePermissionCollection contentPagePeimissionCollection) 
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
            contentPage.ContentPagePermissionCollection = contentPagePeimissionCollection;

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
