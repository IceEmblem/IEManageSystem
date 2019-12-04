using Abp.Dependency;
using Abp.Domain.Repositories;
using IEManageSystem.Entitys.Authorization.Identitys;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using UtilityAction.Other;

namespace IEManageSystem.Entitys.Authorization.LoginManagers
{
    public class LoginManager: ITransientDependency
    {
        private UserManager _userManager { get; set; }

        private IRepository<Role> _roleRepository { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public LoginManager(
            UserManager userManager,
            IRepository<Role> roleRepository,
            IRepository<Permission> permissionRepository
            )
        {
            _userManager = userManager;
            _roleRepository = roleRepository;
            _permissionRepository = permissionRepository;
        }

        public async Task<AbpLoginResult> LoginAsync(string userName, string password, int tenantId)
        {
            AbpLoginResult abpLoginResult = new AbpLoginResult();

            // 验证用户名
            var user = _userManager.GetUserForUserName(userName);
            if (user == null)
            {
                abpLoginResult.Result = AbpLoginResultType.InvalidUserNameOrEmailAddress;
                return abpLoginResult;
            }

            // 验证密码
            if (!_userManager.ValidatePassword(user, password))
            {
                abpLoginResult.Result = AbpLoginResultType.InvalidPassword;
                return abpLoginResult;
            }

            await _userManager.UserRepository.EnsureCollectionLoadedAsync(user, e => e.UserRoles);

            // 获取用户角色
            List<int> roleIds = user.UserRoles.Select(e => e.RoleId).ToList();
            Expression<Func<Role, object>>[] roleSelectors = new Expression<Func<Role, object>>[] {
                e => e.RolePermissions
            };
            var roles = _roleRepository.GetAllIncluding(roleSelectors).Where(e => roleIds.Contains(e.Id)).ToList();

            // 获取用户权限
            List<int> permissionIds = new List<int>();
            roles.ForEach(role =>
            {
                permissionIds.AddRange(role.RolePermissions.Select(e => e.PermissionId).ToList());
            });
            var permissions = await _permissionRepository.GetAllListAsync(e => permissionIds.Contains(e.Id));

            // 验证成功
            abpLoginResult.Result = AbpLoginResultType.Success;
            abpLoginResult.User = new IdentityUser()
            {
                Id = user.Id,
                UserName = user.Account.UserName,
                EmailAddress = user.EmailAddress,
                Name = user.Name,
                Phone = user.Phone,
                TenantId = user.TenantId,
                Roles = roles.Select(e => e.Name).ToList(),
                Permissions = permissions.Select(e => e.Name).ToList(),
            };
            return abpLoginResult;
        }
    }
}
