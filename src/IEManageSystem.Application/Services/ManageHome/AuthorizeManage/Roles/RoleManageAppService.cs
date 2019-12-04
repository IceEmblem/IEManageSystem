using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Roles.Dto;
using System.Linq;
using IEManageSystem.Dtos.Core;
using Abp.Domain.Repositories;
using IEManageSystem.Entitys.Authorization;
using System.Linq.Expressions;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.Attributes;
using Abp.ObjectMapping;
using Abp.UI;
using IEManageSystem.ApiScopeProviders;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Roles
{
    [ApiAuthorization(ApiScopeProvider.RoleManage)]
    public class RoleManageAppService : IEManageSystemAppServiceBase, IRoleManageAppService
    {
        private readonly IObjectMapper _objectMapper;

        private RoleManager _roleManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public RoleManageAppService(
            IObjectMapper objectMapper,
            RoleManager roleManager,
            IRepository<Permission> permissionRepository)
        {
            _objectMapper = objectMapper;

            _roleManager = roleManager;

            _permissionRepository = permissionRepository;
        }

        [ApiAuthorizationQuery]
        public async Task<GetRolesOutput> GetRoles(GetRolesInput input)
        {
            IEnumerable<Role> roles = _roleManager.GetRoles().Where(e => (string.IsNullOrEmpty(input.SearchKey) || e.Name.Contains(input.SearchKey)));

            int num = roles.Count();

            roles = roles.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            return new GetRolesOutput() { Roles = _objectMapper.Map<List<RoleDto>>(roles), ResourceNum = num, PageIndex =input.PageIndex };
        }

        public async Task<AddRoleOutput> AddRole(AddRoleInput input)
        {
            Role role = new Role(input.Name)
            {
                DisplayName = input.DisplayName,
                Describe = input.DisplayName
            };

            await _roleManager.CreateRole(role);

            return new AddRoleOutput();
        }

        public async Task<DeleteRoleOutput> DeleteRole(DeleteRoleInput input)
        {
            _roleManager.DeleteRole(input.Id);

            return new DeleteRoleOutput();
        }

        public async Task<UpdateRoleOutput> UpdateRole(UpdateRoleInput input)
        {
            var role = _roleManager.GetRole(input.Id);

            role.DisplayName = input.DisplayName;
            role.Describe = input.Describe;

            return new UpdateRoleOutput();
        }

        [ApiAuthorizationQuery]
        public async Task<GetPermissionsOutput> GetPermissions(GetPermissionsInput input)
        {
            Expression<Func<Role, object>>[] propertySelectors = new Expression<Func<Role, object>>[] {
                e => e.RolePermissions
            };
            var role = _roleManager.RoleRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == input.Id);

            List<int> permissionIds = role.RolePermissions.Select(e => e.PermissionId).ToList();
            var permissions = await _permissionRepository.GetAllListAsync(e => permissionIds.Contains(e.Id));

            return new GetPermissionsOutput() { Permissions = _objectMapper.Map<List<PermissionDto>>(permissions) };
        }

        public async Task<AddPermissionOutput> AddPermission(AddPermissionInput input)
        {
            var role = _roleManager.GetRole(input.RoleId);
            if (role == null) {
                throw new UserFriendlyException("找不到要添加权限的角色");
            }

            var permission = _permissionRepository.Get(input.PermissionId);
            if (permission == null) {
                throw new UserFriendlyException("找不到要添加的权限");
            }

            _roleManager.AddPermission(role, permission);
            return new AddPermissionOutput();
        }

        public async Task<RemovePermissionOutput> RemovePermission(RemovePermissionInput input)
        {
            var role = _roleManager.GetRole(input.RoleId);
            if (role == null)
            {
                throw new UserFriendlyException("找不到要移除权限的角色");
            }

            var permission = _permissionRepository.Get(input.PermissionId);
            if (permission == null)
            {
                throw new UserFriendlyException("找不到要移除的权限");
            }

            _roleManager.RemovePermission(role, permission);
            return new RemovePermissionOutput();
        }
    }
}
