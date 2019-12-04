using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.Dtos.ApiAuthorization;
using IEManageSystem.Dtos.Core;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes
{
    [ApiAuthorization(ApiScopeProvider.ApiScopeManage)]
    public class ApiScopeManageAppService: IEManageSystemAppServiceBase, IApiScopeManageAppService
    {
        private readonly IObjectMapper _objectMapper;

        private ApiScopeManager _apiScopeManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public ApiScopeManageAppService(
            IObjectMapper objectMapper,
            ApiScopeManager apiScopeManager,
            IRepository<Permission> permissionRepository)
        {
            _objectMapper = objectMapper;

            _apiScopeManager = apiScopeManager;

            _permissionRepository = permissionRepository;
        }

        [ApiAuthorizationQuery]
        public async Task<GetApiScopesOutput> GetApiScopes(GetApiScopesInput input)
        {
            return new GetApiScopesOutput() {
                ApiScopes = _objectMapper.Map<List<ApiScopeDto>>(_apiScopeManager.GetApiScopes().ToList())
            };
        }

        [ApiAuthorizationQuery]
        public async Task<GetManagePermissionsOutput> GetManagePermissions(GetManagePermissionsInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiManageScope.ApiScopePermissions
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e=>e.Id == input.Id);
            if (apiScope == null) {
                return new GetManagePermissionsOutput() { ErrorMessage = "未找到Api域" };
            }

            var permissionIds = apiScope.ApiManageScope.ApiScopePermissions.Select(e => e.PermissionId).ToList();

            var apiScopePermissions = _permissionRepository.GetAllList(e=>permissionIds.Contains(e.Id));

            return new GetManagePermissionsOutput() {
                Permissions = _objectMapper.Map<List<PermissionDto>>(apiScopePermissions)
            };
        }

        [ApiAuthorizationQuery]
        public async Task<GetManagePermissionsByNameOutput> GetManagePermissionsByName(GetManagePermissionsByNameInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiManageScope.ApiScopePermissions
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e => e.Name == input.Name);
            if (apiScope == null)
            {
                return new GetManagePermissionsByNameOutput() { ErrorMessage = "未找到Api域" };
            }

            var permissionIds = apiScope.ApiManageScope.ApiScopePermissions.Select(e => e.PermissionId).ToList();

            var apiScopePermissions = _permissionRepository.GetAllList(e => permissionIds.Contains(e.Id));

            return new GetManagePermissionsByNameOutput()
            {
                Permissions = _objectMapper.Map<List<PermissionDto>>(apiScopePermissions)
            };
        }

        public async Task<AddManagePermissionOutput> AddManagePermission(AddManagePermissionInput input)
        {
            _apiScopeManager.AddManagePermission(input.ApiScopeId, input.PermissionId);

            return new AddManagePermissionOutput();
        }

        public async Task<RemoveManagePermissionOutput> RemoveManagePermission(RemoveManagePermissionInput input)
        {
            _apiScopeManager.RemoveManagePermission(input.ApiScopeId, input.PermissionId);

            return new RemoveManagePermissionOutput();
        }

        [ApiAuthorizationQuery]
        public async Task<GetQueryPermissionsOutput> GetQueryPermissions(GetQueryPermissionsInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiQueryScope.ApiScopePermissions
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e => e.Id == input.Id);
            if (apiScope == null)
            {
                return new GetQueryPermissionsOutput() { ErrorMessage = "未找到Api域" };
            }

            var permissionIds = apiScope.ApiQueryScope.ApiScopePermissions.Select(e => e.PermissionId).ToList();

            var apiScopePermissions = _permissionRepository.GetAllList(e => permissionIds.Contains(e.Id));

            return new GetQueryPermissionsOutput()
            {
                Permissions = _objectMapper.Map<List<PermissionDto>>(apiScopePermissions)
            };
        }

        [ApiAuthorizationQuery]
        public async Task<GetQueryPermissionsByNameOutput> GetQueryPermissionsByName(GetQueryPermissionsByNameInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiQueryScope.ApiScopePermissions
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e => e.Name == input.Name);
            if (apiScope == null)
            {
                return new GetQueryPermissionsByNameOutput() { ErrorMessage = "未找到Api域" };
            }

            var permissionIds = apiScope.ApiQueryScope.ApiScopePermissions.Select(e => e.PermissionId).ToList();

            var apiScopePermissions = _permissionRepository.GetAllList(e => permissionIds.Contains(e.Id));

            return new GetQueryPermissionsByNameOutput()
            {
                Permissions = _objectMapper.Map<List<PermissionDto>>(apiScopePermissions)
            };
        }

        public async Task<AddQueryPermissionOutput> AddQueryPermission(AddQueryPermissionInput input)
        {
            _apiScopeManager.AddQueryPermission(input.ApiScopeId, input.PermissionId);

            return new AddQueryPermissionOutput();
        }

        public async Task<RemoveQueryPermissionOutput> RemoveQueryPermission(RemoveQueryPermissionInput input)
        {
            _apiScopeManager.RemoveQueryPermission(input.ApiScopeId, input.PermissionId);

            return new RemoveQueryPermissionOutput();
        }
    }
}
