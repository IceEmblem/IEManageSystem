using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes.AuthorizationNodes;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class ApiScopeManager:IDomainService
    {
        public IRepository<ApiScope> ApiScopeRepository { get; set; }

        private PermissionManager _permissionManager { get; set; }

        public ApiScopeManager(
            IRepository<ApiScope> apiScopeRepository,
            PermissionManager permissionManager
            )
        {
            ApiScopeRepository = apiScopeRepository;

            _permissionManager = permissionManager;
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
        public List<UserScopeAccessAuthority> GetUserScopeAccessAuthorities(IEnumerable<Permission> userPermissions)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiManageScope,
                e => e.ApiManageScope.ApiScopePermissions,
                e => e.ApiQueryScope,
                e => e.ApiQueryScope.ApiScopePermissions
            };
            var apiScopes = ApiScopeRepository.GetAllIncluding(propertySelectors).ToList();

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

        public void Register(string name, string displayName = null)
        {
            if (!ApiScopeRepository.GetAll().Any(e => e.Name == name))
            {
                Permission scopeManagePermission = new Permission(name + ApiManageScope.NamePostfix) {
                    DisplayName = (displayName ?? name) + "域权限" + ApiManageScope.DisplayNamePostfix
                };
                _permissionManager.Create(scopeManagePermission);
                Permission queryManagePermission = new Permission(name + ApiQueryScope.NamePostfix) {
                    DisplayName = (displayName ?? name) + "域权限" + ApiQueryScope.DisplayNamePostfix
                };
                _permissionManager.Create(queryManagePermission);

                ApiScope apiScope = new ApiScope(name);

                apiScope.SetDisplayName(displayName ?? name);

                apiScope.ApiManageScope.AddPermission(scopeManagePermission);
                apiScope.ApiQueryScope.AddPermission(scopeManagePermission);
                apiScope.ApiQueryScope.AddPermission(queryManagePermission);

                ApiScopeRepository.Insert(apiScope);
            }
        }

        public void RemoveAllApiScope()
        {
            ApiScopeRepository.Delete((entity) => true);
        }

        public IQueryable<ApiScope> GetApiScopes() => ApiScopeRepository.GetAll();

        public IQueryable<ApiScope> GetApiScopes(Expression<Func<ApiScope, object>>[] propertySelectors)
        {
            return ApiScopeRepository.GetAllIncluding(propertySelectors);
        }

        public void AddManagePermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiManageScope
            };
            var apiScope = ApiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);
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
        }

        public void RemoveManagePermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] 
            {
                e=>e.ApiManageScope,
                e=>e.ApiManageScope.ApiScopePermissions
            };
            var apiScope = ApiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);

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
        }

        public void AddQueryPermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiQueryScope
            };
            var apiScope = ApiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);
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
        }

        public void RemoveQueryPermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[]
            {
                e=>e.ApiQueryScope,
                e=>e.ApiQueryScope.ApiScopePermissions
            };
            var apiScope = ApiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);

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
        }
    }
}
