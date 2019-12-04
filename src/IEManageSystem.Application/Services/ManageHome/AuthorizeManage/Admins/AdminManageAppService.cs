using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using IEManageSystem.Dtos.Core;
using System.Threading.Tasks;
using IEManageSystem.Entitys.Authorization.Roles;
using System.Linq.Expressions;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.Dtos.Core.Users;
using IEManageSystem.Attributes;
using Abp.ObjectMapping;
using Abp.UI;
using IEManageSystem.ApiScopeProviders;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins
{
    [ApiAuthorization(ApiScopeProvider.AdminManage)]
    public class AdminManageAppService: IEManageSystemAppServiceBase, IAdminManageAppService
    {
        private readonly IObjectMapper _objectMapper;

        private AdminManager _adminManager { get; set; }

        private RoleManager _roleManager { get; set; }

        private PermissionManager _permissionManager { get; set; }

        public AdminManageAppService(
            IObjectMapper objectMapper,
            AdminManager adminManager,
            RoleManager roleManager,
            PermissionManager permissionManager)
        {
            _objectMapper = objectMapper;
            _adminManager = adminManager;
            _roleManager = roleManager;
            _permissionManager = permissionManager;
        }

        [ApiAuthorizationQuery]
        public async Task<GetAdminsOutput> GetAdmins(GetAdminsInput input)
        {
            Expression<Func<User, object>>[] propertySelectors = new Expression<Func<User, object>>[] {
                e=>e.Account
            };

            IEnumerable<User> admins = _adminManager.GetAdminsIncluding(propertySelectors).Where(e => (string.IsNullOrEmpty(input.SearchKey) || e.Name.Contains(input.SearchKey)));

            int num = admins.Count();

            admins = admins.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            return new GetAdminsOutput() { Admins = _objectMapper.Map<List<UserDto>>(admins), ResourceNum = num, PageIndex = input.PageIndex };
        }

        public async Task<CreateAdminOutput> CreateAdmin(CreateAdminInput input)
        {
            var admin = await _adminManager.CreateAdmin(input.UserName, input.Password, input.Name, input.TenantId);

            admin.EmailAddress = input.EmailAddress;
            admin.Phone = input.Phone;

            return new CreateAdminOutput();
        }

        public async Task<UpdateAdminOutput> UpdateAdmin(UpdateAdminInput input)
        {
            var admin = _adminManager.GetAdmin(input.Id);

            if (admin == null) {
                throw new Exception("找不到要更新的管理员");
            }

            if (!string.IsNullOrEmpty(input.Password)) {
                _adminManager.UpdatePassword(admin, input.Password);
            }

            admin.EmailAddress = input.EmailAddress;
            admin.Name = input.Name;
            admin.Phone = input.Phone;

            return new UpdateAdminOutput();
        }

        public async Task<DeleteAdminOutput> DeleteAdmin(DeleteAdminInput input)
        {
            _adminManager.DeleteAdmin(input.Id);

            return new DeleteAdminOutput();
        }

        [ApiAuthorizationQuery]
        public async Task<GetAdminRolesOutput> GetAdminRoles(GetAdminRolesInput input)
        {
            Expression<Func<User, object>>[] propertySelectors = new Expression<Func<User, object>>[] {
                e => e.UserRoles
            };
            var admin = _adminManager.GetAdminsIncluding(propertySelectors).FirstOrDefault(e => e.Id == input.Id);

            if (admin == null) {
                throw new UserFriendlyException("未找到管理员");
            }

            var roleIds = admin.UserRoles.Select(e => e.RoleId).ToList();
            var roles = _roleManager.GetRoles().Where(e => roleIds.Contains(e.Id)).ToList();

            return new GetAdminRolesOutput() { Roles = _objectMapper.Map<List<RoleDto>>(roles) };
        }

        public async Task<AddRoleOutput> AddRole(AddRoleInput input)
        {
            var admin = _adminManager.GetAdmin(input.AdminId);
            if (admin == null)
            {
                throw new Exception("找不到要添加权限的管理员");
            }

            var role = _roleManager.GetRole(input.RoleId);
            if (role == null)
            {
                throw new Exception("找不到要添加的权限");
            }

            _adminManager.AddRole(admin, role);

            return new AddRoleOutput();
        }

        public async Task<RemoveRoleOutput> RemoveRole(RemoveRoleInput input)
        {
            var admin = _adminManager.GetAdmin(input.AdminId);
            if (admin == null)
            {
                throw new Exception("找不到要添加权限的管理员");
            }

            var role = _roleManager.GetRole(input.RoleId);
            if (role == null)
            {
                throw new Exception("找不到要添加的权限");
            }

            _adminManager.Remove(admin, role);

            return new RemoveRoleOutput();
        }

        [ApiAuthorizationQuery]
        public async Task<GetPermissionsOutput> GetPermissions(GetPermissionsInput input)
        {
            Expression<Func<User, object>>[] adminProperty = new Expression<Func<User, object>>[] {
                e => e.UserRoles
            };
            var admin = _adminManager.GetAdminsIncluding(adminProperty).FirstOrDefault(e => e.Id == input.Id);

            if (admin == null)
            {
                throw new UserFriendlyException("未找到管理员");
            }

            var roleIds = admin.UserRoles.Select(e => e.RoleId).ToList();
            Expression<Func<Role, object>>[] roleProperty = new Expression<Func<Role, object>>[] {
                e => e.RolePermissions
            };
            var roles = _roleManager.RoleRepository.GetAllIncluding(roleProperty).Where(e => roleIds.Contains(e.Id)).ToList();

            var permissionIds = new List<int>();
            roles.ForEach(role =>
            {
                role.RolePermissions.ToList().ForEach(polePermission => { permissionIds.Add(polePermission.PermissionId); });
            });
            permissionIds = permissionIds.Distinct().ToList();

            var permissions = await _permissionManager.PermissionRepository.GetAllListAsync(e => permissionIds.Contains(e.Id));

            return new GetPermissionsOutput() { Permissions = _objectMapper.Map<List<PermissionDto>>(permissions) };
        }
    }
}
