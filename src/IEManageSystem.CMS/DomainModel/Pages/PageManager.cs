using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.UI;
using Castle.Core.Logging;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Configuration;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.Json;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class PageManager : ITransientDependency
    {
        public const string HomeName = "home";

        public const string PagePageSuffix = "Page.json";

        public const string PageCompleteJsonFileFuffix = "json";

        public const string PagesCacheName = "PageManager_Pages";

        public static string PageDirPath { get; }

        public ILogger Logger { get; set; }

        private IIEMemoryCache _cache { get; }

        private IRepository<ContentPagePermissionCollection> _contentPagePermissionCollectionRepository { get; }

        static PageManager()
        {
            PageDirPath = AppConfigurations.RootPath + "/Pages";

            if (!Directory.Exists(PageDirPath))
            {
                Directory.CreateDirectory(PageDirPath);
            }
        }

        public PageManager(
            IIEMemoryCache cache,
            IRepository<ContentPagePermissionCollection> contentPagePermissionCollectionRepository
            )
        {
            _cache = cache;
            Logger = NullLogger.Instance;
            _contentPagePermissionCollectionRepository = contentPagePermissionCollectionRepository;
        }

        public List<Page> GetPagesForCache() {
            return _cache.GetOrCreate<List<Page>>(PagesCacheName, cacheEntity => {

                cacheEntity.SlidingExpiration = TimeSpan.FromHours(1);

                cacheEntity.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);

                cacheEntity.SetPriority(CacheItemPriority.NeverRemove);

                List<Page> pages = new List<Page>();
                foreach (var file in Directory.GetFiles(PageDirPath)) {
                    if (file.EndsWith(PagePageSuffix)) {
                        try
                        {
                            pages.Add(JsonSerializer.Deserialize<Page>(File.ReadAllText(file), new JsonSerializerOptions()
                            {
                                IgnoreNullValues = true
                            }));
                        }
                        catch (Exception ex) 
                        {
                            Logger.Error($"页面 {file} 格式错误，错误消息：{ ex.Message }");
                        }
                    }
                }

                return pages;
            });
        }

        public void SetPagesInvalidForCache() {
            _cache.Remove(PagesCacheName);
        }

        /// <summary>
        /// 获取具有管理文章权限的页面
        /// </summary>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public IEnumerable<Page> GetPagesForManagePermission(IEnumerable<Permission> permissions) 
        {
            IEnumerable<int> permissionIds = permissions.Select(e => e.Id);

            // 如果用户拥有该页面管理权限
            List<string> pageNames = _contentPagePermissionCollectionRepository.GetAll().Where(e => e.ContentPagePermissions.Any(e => e.IsManage && permissionIds.Contains(e.PermissionId))).Select(e => e.PageName).ToList();

            return GetPagesForCache().Where(page => pageNames.Contains(page.Name));
        }

        /// <summary>
        /// 获取具有查询文章权限的页面
        /// </summary>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public IEnumerable<Page> GetPagesForQueryPermission(IEnumerable<Permission> permissions) 
        {
            IEnumerable<int> permissionIds = permissions.Select(e => e.Id);

            // 如果页面未启用查询权限 || 如果用户拥有该页面查询权限
            List<string> pageNames = _contentPagePermissionCollectionRepository
                .GetAll()
                .Where(e =>
                    !(e.IsEnableQueryPermission == false
                    || e.ContentPagePermissions.Any(e => !e.IsManage && permissionIds.Contains(e.PermissionId))))
                .Select(e => e.PageName).ToList();

            return GetPagesForCache().Where(page => !pageNames.Contains(page.Name));
        }

        /// <summary>
        /// 是否可以访问该页面的文章
        /// </summary>
        /// <returns></returns>
        public bool IsCanQueryPost(string pageName, IEnumerable<Permission> permissions) 
        {
            var contentPagePermissionCollection = _contentPagePermissionCollectionRepository.GetAllIncluding(e => e.ContentPagePermissions).FirstOrDefault(e => e.PageName == pageName);

            if (contentPagePermissionCollection == null || contentPagePermissionCollection.IsCanQueryPost(permissions))
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
            var contentPagePermissionCollection = _contentPagePermissionCollectionRepository.GetAllIncluding(e => e.ContentPagePermissions).FirstOrDefault(e => e.PageName == pageName);

            if (contentPagePermissionCollection.IsCanManagePost(permissions))
            {
                return true;
            }

            return false;
        }

        public void AddPage(Page page, User user, string pageCompleteJson)
        {
            if (GetPagesForCache().Any(e => e.Name == page.Name))
            {
                throw new UserFriendlyException($"已存在名为{page.Name}的页面，请重新命名");
            }

            page.Creator = new EntityEdit(user.Id, user.Name, user.HeadSculpture);
            page.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);

            string filePath = $"{PageDirPath}/{page.Name}.{PagePageSuffix}";
            File.WriteAllText(filePath, JsonSerializer.Serialize(page));
            SetPagesInvalidForCache();

            // 更新页面完整文件
            string pageCompleteJsonFilePath = $"{PageDirPath}/{page.Name}.{PageCompleteJsonFileFuffix}";
            File.WriteAllText(pageCompleteJsonFilePath, pageCompleteJson);
        }

        public void UpdatePage(Page page, User user, string pageCompleteJson) 
        {
            if (!GetPagesForCache().Any(e => e.Name == page.Name))
            {
                throw new UserFriendlyException($"页面 {page.Name} 不存在");
            }

            page.LastUpdater = new EntityEdit(user.Id, user.Name, user.HeadSculpture);

            // 更新页面文件
            string filePath = $"{PageDirPath}/{page.Name}.{PagePageSuffix}";
            File.WriteAllText(filePath, JsonSerializer.Serialize(page));
            SetPagesInvalidForCache();

            if (!string.IsNullOrWhiteSpace(pageCompleteJson)) 
            {
                // 更新页面完整文件
                string pageCompleteJsonFilePath = $"{PageDirPath}/{page.Name}.{PageCompleteJsonFileFuffix}";
                File.WriteAllText(pageCompleteJsonFilePath, pageCompleteJson);
            }
        }

        public void DeletePage(string pageName)
        {
            if (pageName.ToLower() == HomeName)
            {
                throw new UserFriendlyException("不能删除主页");
            }

            // 删除页面
            string filePath = $"{PageDirPath}/{pageName}.{PagePageSuffix}";
            File.Delete(filePath);
            SetPagesInvalidForCache();

            // 删除完整页面
            string pageCompleteJsonFilePath = $"{PageDirPath}/{pageName}.{PageCompleteJsonFileFuffix}";
            File.Delete(pageCompleteJsonFilePath);
        }

        /// <summary>
        /// 更新内容也权限
        /// </summary>
        /// <param name="pageName"></param>
        /// <param name="contentPagePeimissionCollection"></param>
        public void UpdateContentPagePermission(string pageName, ContentPagePermissionCollection contentPagePeimissionCollection)
        {
            contentPagePeimissionCollection.PageName = pageName;
            _contentPagePermissionCollectionRepository.Delete(e => e.PageName == pageName);
            _contentPagePermissionCollectionRepository.Insert(contentPagePeimissionCollection);
        }

    }
}
