using Abp.Domain.Repositories;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using IEManageSystem.Dtos.Core;
using System.Threading.Tasks;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.Attributes;
using Abp.ObjectMapping;
using IEManageSystem.ApiScopeProviders;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions
{
    [ApiAuthorization(ApiScopeProvider.PermissionManage)]
    public class PermissionManageAppService: IEManageSystemAppServiceBase, IPermissionManageAppService
    {
        private readonly IObjectMapper _objectMapper;

        private PermissionManager _permissionManager { get; set; }

        public PermissionManageAppService(
            IObjectMapper objectMapper,
            PermissionManager permissionManager)
        {
            _objectMapper = objectMapper;

            _permissionManager = permissionManager;
        }

        [ApiAuthorizationQuery]
        public async Task<GetPermissionsOutput> GetPermissions(GetPermissionsInput input)
        {
            IEnumerable<Permission> permissions = _permissionManager.PermissionRepository.GetAll().Where(e => (e.Name != null && e.Name.Contains(input.SearchKey)) || string.IsNullOrEmpty(input.SearchKey));

            int num = permissions.Count();

            permissions = permissions.OrderByDescending(e => e.Id).Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize).ToList();

            return new GetPermissionsOutput() { Permissions = _objectMapper.Map<List<PermissionDto>>(permissions), ResourceNum = num, PageIndex = input.PageIndex };
        }

        public async Task<AddPermissionOutput> AddPermission(AddPermissionInput input)
        {
            Permission permission = new Permission(input.Name);
            permission.DisplayName = input.DisplayName;

            _permissionManager.Create(permission);

            return new AddPermissionOutput();
        }

        public async Task<DeletePermissionOutput> DeletePermission(DeletePermissionInput input)
        {
            _permissionManager.Delete(input.Id);

            return new DeletePermissionOutput();
        }

        public async Task<UpdatePermissionOutput> UpdatePermission(UpdatePermissionInput input)
        {
            Permission permission = _permissionManager.PermissionRepository.FirstOrDefault(input.Id);

            if (permission == null)
            {
                return new UpdatePermissionOutput() { ErrorMessage = "找不到要更新的权限" };
            }

            permission.DisplayName = input.DisplayName;

            return new UpdatePermissionOutput();
        }
    }
}
