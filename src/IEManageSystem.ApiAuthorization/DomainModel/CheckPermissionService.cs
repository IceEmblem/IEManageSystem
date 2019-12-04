using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel
{
    public class CheckPermissionService : IDomainService
    {
        private ApiScopeManager _apiScopeManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public CheckPermissionService(
            ApiScopeManager apiScopeManager,
            IRepository<Permission> permissionRepository)
        {
            _apiScopeManager = apiScopeManager;

            _permissionRepository = permissionRepository;
        }

        public bool IsAllowAccess(string apiScopeName, bool isQueryAction, IEnumerable<string> permissionNames)
        {
            // 获取要访问的Api域
            Expression<Func<ApiScope, object>>[] apiScopeSelectors = new Expression<Func<ApiScope, object>>[]
            {
                e => e.ApiManageScope,
                e => e.ApiManageScope.ApiScopePermissions,
                e => e.ApiQueryScope,
                e => e.ApiQueryScope.ApiScopePermissions,
            };
            var apiScope = _apiScopeManager.ApiScopeRepository.GetAllIncluding(apiScopeSelectors).FirstOrDefault(e => e.Name == apiScopeName);

            // 获取拥有的权限
            var permissions = _permissionRepository.GetAllList(e => permissionNames.Contains(e.Name)).ToList();

            if (isQueryAction == true)
            {
                return apiScope.ApiQueryScope.IsAllowAccess(permissions);
            }

            return apiScope.ApiManageScope.IsAllowAccess(permissions);
        }
    }
}
