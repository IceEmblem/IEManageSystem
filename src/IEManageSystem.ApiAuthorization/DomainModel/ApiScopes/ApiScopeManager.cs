using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes.AuthorizationNodes;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class ApiScopeManager:IDomainService
    {
        private IEfRepository<ApiScope, int> _apiScopeRepository { get; set; }

        private IIEMemoryCache _cache { get; set; }

        private PermissionManager _permissionManager { get; set; }

        public ApiScopeManager(
            IEfRepository<ApiScope, int> apiScopeRepository,
            PermissionManager permissionManager,
            IIEMemoryCache cache
            )
        {
            _apiScopeRepository = apiScopeRepository;

            _permissionManager = permissionManager;

            _cache = cache;
        }

        private string GetApiScopeCacheName(string scopeName) => $"ApiScopeManager_{scopeName}_";

        public ApiScope GetApiScopeForCache(string scopeName) 
        {
            return _cache.GetOrCreate<ApiScope>(GetApiScopeCacheName(scopeName), cacheEntity => {
                // 设置过期时间，过期后会重新调用该函数生成值

                // 设置过期时间
                // 如果5秒内没有访问该值，则过期
                // 否则，过期时间刷新为访问的时间 +5 秒
                cacheEntity.SlidingExpiration = TimeSpan.FromHours(1);

                // 设置绝对过期时间
                // 过期时间为15秒后，无论这15秒内是否有访问都会过期
                cacheEntity.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);

                // 设置该项优先级
                // NeverRemove 为不会从缓存中移除，除非过期
                // 优先级越低，内存不足时，将会移除该项
                cacheEntity.SetPriority(CacheItemPriority.NeverRemove);

                // 获取要访问的Api域
                Expression<Func<ApiScope, object>>[] apiScopeSelectors = new Expression<Func<ApiScope, object>>[]
                {
                e => e.ApiManageScope,
                e => e.ApiManageScope.ApiScopePermissions,
                e => e.ApiQueryScope,
                e => e.ApiQueryScope.ApiScopePermissions,
                };

                _apiScopeRepository.NoTracking();
                var apiScope = _apiScopeRepository.GetAllIncluding(apiScopeSelectors).FirstOrDefault(e => e.Name == scopeName);
                _apiScopeRepository.Tracking();

                if (apiScope == null)
                {
                    return null;
                }

                return apiScope;
            });
        }

        // 使缓存的Api域失效
        public void SetApiScopeInvalidForCache(string scopeName) {
            _cache.Remove(GetApiScopeCacheName(scopeName));
        }

        /// <summary>
        /// 获取可以访问的域
        /// </summary>
        /// <param name="userPermissionNames"></param>
        /// <returns></returns>
        public List<UserScopeAccessAuthority> GetUserScopeAccessAuthorities(IEnumerable<string> userPermissionNames)
        {
            List<Permission> userPermissions = _permissionManager.PermissionRepository.GetAllList(e => userPermissionNames.Contains(e.Name));

            return GetUserScopeAccessAuthorities(userPermissions);
        }

        /// <summary>
        /// 获取可以访问的域
        /// </summary>
        /// <param name="userPermissions"></param>
        /// <returns></returns>
        private List<UserScopeAccessAuthority> GetUserScopeAccessAuthorities(IEnumerable<Permission> userPermissions)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiManageScope,
                e => e.ApiManageScope.ApiScopePermissions,
                e => e.ApiQueryScope,
                e => e.ApiQueryScope.ApiScopePermissions
            };
            var apiScopes = _apiScopeRepository.GetAllIncluding(propertySelectors).ToList();

            List<UserScopeAccessAuthority> userScopeAccessAuthoritys = new List<UserScopeAccessAuthority>();
            List<int> permissionIds = userPermissions.Select(e => e.Id).ToList();
            foreach (var apiScope in apiScopes)
            {
                bool manageAuthority = apiScope.ApiManageScope.IsAllowAccess(userPermissions);
                bool queryAuthority = apiScope.ApiQueryScope.IsAllowAccess(userPermissions);

                if (manageAuthority || queryAuthority) {
                    userScopeAccessAuthoritys.Add(new UserScopeAccessAuthority(apiScope.Name, manageAuthority, queryAuthority));
                }
            }

            return userScopeAccessAuthoritys;
        }

        public void Register(string name, string displayName)
        {
            if (!_apiScopeRepository.GetAll().Any(e => e.Name == name))
            {
                ApiScope apiScope = new ApiScope(name);

                apiScope.SetDisplayName(displayName ?? name);

                _apiScopeRepository.Insert(apiScope);
            }
        }

        public void Register(string name, string displayName, List<Permission> managePermissions, List<Permission> queryPermissions)
        {
            if (!_apiScopeRepository.GetAll().Any(e => e.Name == name))
            {
                ApiScope apiScope = new ApiScope(name);

                apiScope.SetDisplayName(displayName ?? name);

                managePermissions.ForEach(item => apiScope.ApiManageScope.AddPermission(item));
                queryPermissions.ForEach(item => apiScope.ApiQueryScope.AddPermission(item));

                _apiScopeRepository.Insert(apiScope);
            }
        }

        public void RegisterRange(IEnumerable<ApiScope> apiScopes) 
        {
            IEnumerable<string> name = apiScopes.Select(e=>e.Name);
            IEnumerable<string> existApiScopeName = _apiScopeRepository.GetAll().Where(e => name.Contains(e.Name)).Select(e=>e.Name);

            IEnumerable<ApiScope> needRegisterScopes = apiScopes.Where(e=> !existApiScopeName.Contains(e.Name));
            foreach (var item in needRegisterScopes) {
                _apiScopeRepository.Insert(item);
            }
        }

        public IQueryable<ApiScope> GetApiScopes() => _apiScopeRepository.GetAll();

        public IQueryable<ApiScope> GetApiScopes(Expression<Func<ApiScope, object>>[] propertySelectors)
        {
            return _apiScopeRepository.GetAllIncluding(propertySelectors);
        }

        public void AddManagePermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiManageScope
            };
            var apiScope = _apiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);
            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var permission = _permissionManager.PermissionRepository.FirstOrDefault(permissionId);
            if (permission == null)
            {
                throw new Exception("找不到要添加的权限");
            }

            apiScope.ApiManageScope.AddPermission(permission);
            SetApiScopeInvalidForCache(apiScope.Name);
        }

        public void RemoveManagePermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] 
            {
                e=>e.ApiManageScope,
                e=>e.ApiManageScope.ApiScopePermissions
            };
            var apiScope = _apiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);

            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var permission = _permissionManager.PermissionRepository.FirstOrDefault(permissionId);
            if (permission == null)
            {
                throw new Exception("找不到要移除的权限");
            }

            apiScope.ApiManageScope.RemovePermission(permission);

            SetApiScopeInvalidForCache(apiScope.Name);
        }

        public void AddQueryPermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiQueryScope
            };
            var apiScope = _apiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);
            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var permission = _permissionManager.PermissionRepository.FirstOrDefault(permissionId);
            if (permission == null)
            {
                throw new Exception("找不到要添加的权限");
            }

            apiScope.ApiQueryScope.AddPermission(permission);

            SetApiScopeInvalidForCache(apiScope.Name);
        }

        public void RemoveQueryPermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[]
            {
                e=>e.ApiQueryScope,
                e=>e.ApiQueryScope.ApiScopePermissions
            };
            var apiScope = _apiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);

            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var permission = _permissionManager.PermissionRepository.FirstOrDefault(permissionId);
            if (permission == null)
            {
                throw new Exception("找不到要移除的权限");
            }

            apiScope.ApiQueryScope.RemovePermission(permission);

            SetApiScopeInvalidForCache(apiScope.Name);
        }
    }
}
