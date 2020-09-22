using Abp.Dependency;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Entitys.Authorization.Users;
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

        private IIEMemoryCache _cache { get; }

        public PageManager(
            IPageRepository pageRepository,
            IIEMemoryCache cache
            )
        {
            PageRepository = pageRepository;
            _cache = cache;
        }

        public IPageRepository PageRepository { get; }

        private string GetPageCacheName(string pageName) => $"PageManager_Page_{pageName}_";

        private string GetPageNameCacheName(int id) => $"PageManager_PageName_{id}_";

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
        /// 从缓存中获取页面的名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetPageNameCache(int id) {
            return _cache.GetOrCreate<string>(GetPageNameCacheName(id), cacheEntity => {

                cacheEntity.SlidingExpiration = TimeSpan.FromHours(1);

                cacheEntity.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);

                cacheEntity.SetPriority(CacheItemPriority.NeverRemove);

                PageRepository.NoTracking();
                var pageName = PageRepository.GetAll().Where(e => e.Id == id).Select(e => e.Name).FirstOrDefault();
                PageRepository.Tracking();

                return pageName;
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

            // 如果用户拥有该页面管理权限
            return PageRepository.GetAll().OfType<ContentPage>().Where(e => e.ContentPagePermissionCollection.ContentPagePermissions.Any(e => e.IsManage && permissionIds.Contains(e.PermissionId)));
        }

        /// <summary>
        /// 获取具有查询文章权限的页面
        /// </summary>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public IEnumerable<ContentPage> GetPagesForQueryPermission(IEnumerable<Permission> permissions) 
        {
            IEnumerable<int> permissionIds = permissions.Select(e => e.Id);

            // 如果页面未启用查询权限 || 如果用户拥有该页面查询权限
            return PageRepository.GetAll().OfType<ContentPage>().Where(e => 
                e.ContentPagePermissionCollection.IsEnableQueryPermission == false
                || e.ContentPagePermissionCollection.ContentPagePermissions.Any(e => !e.IsManage && permissionIds.Contains(e.PermissionId))
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
            if (contentPage.ContentPagePermissionCollection.IsCanQueryPost(permissions))
            {
                return true;
            }

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
            if (contentPage.ContentPagePermissionCollection.IsCanManagePost(permissions))
            {
                return true;
            }

            return false;
        }

        public void AddPage(PageBase page, User user)
        {
            if (PageRepository.GetAll().Any(e => e.Name == page.Name))
            {
                throw new UserFriendlyException($"已存在名为{page.Name}的页面，请重新命名");
            }

            page.Creator = new EntityEdit(user.Id, user.Name, user.HeadSculpture);
            page.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);

            PageRepository.Insert(page);
        }

        public void UpdatePage(PageBase page, User user) 
        {
            if (PageRepository.GetAll().Any(e => e.Name == page.Name && e.Id != page.Id))
            {
                throw new UserFriendlyException($"已存在名为{page.Name}的页面，请重新命名");
            }

            PageRepository.Update(page);

            page.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);

            SetPageInvalidForCache(page.Name);
        }

        public void UpdateContentPagePermission(PageBase page, ContentPagePermissionCollection contentPagePeimissionCollection, User user) 
        {
            if (!(page is ContentPage))
            {
                throw new UserFriendlyException("无法更改页面权限，请确保页面属于内容页");
            }

            PageRepository.GetContentPagesIncludePermissionCollection().FirstOrDefault(e => e.Id == page.Id);

            var contentPage = (ContentPage)page;
            contentPage.ContentPagePermissionCollection = contentPagePeimissionCollection;
            contentPage.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);

            SetPageInvalidForCache(page.Name);
        }

        public void DeletePage(PageBase page)
        {
            if (page.Name.ToLower() == HomeName)
            {
                throw new UserFriendlyException("不能删除主页");
            }

            // 加载 page 聚和所有实体
            PageRepository.GetPageOfAllIncludes(page.Name);

            // 删除页面
            PageRepository.Delete(page);

            SetPageInvalidForCache(page.Name);
        }
    }
}
