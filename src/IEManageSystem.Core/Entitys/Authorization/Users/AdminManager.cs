using Abp.Domain.Services;
using IEManageSystem.Entitys.Authorization.Roles;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Abp.Domain.Repositories;
using Abp.UI;

namespace IEManageSystem.Entitys.Authorization.Users
{
    public class AdminManager:IDomainService
    {
        private RoleManager _roleManager { get; set; }

        private IRepository<Role> _roleRepository => _roleManager.RoleRepository;

        private UserManager _userManager { get; set; }

        public AdminManager(
            UserManager userManager,
            RoleManager roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        private IQueryable<User> _getAdmins(Expression<Func<User, object>>[] propertySelectors = null)
        {
            var role = _roleRepository.FirstOrDefault(e=>e.Name == Role.Admin.Name);

            var admins = propertySelectors == null ? _userManager.UserRepository.GetAll() :
                _userManager.UserRepository.GetAllIncluding(propertySelectors);

            admins = admins.Where(e => e.UserRoles.Any(userRole => userRole.RoleId == role.Id));

            return admins;
        } 

        public User GetAdmin(int id) => _getAdmins().FirstOrDefault(e => e.Id == id);

        public IQueryable<User> GetAdmins() => _getAdmins();

        public IQueryable<User> GetAdminsIncluding(Expression<Func<User, object>>[] propertySelectors) => _getAdmins(propertySelectors);

        public async Task<User> CreateAdmin(string userName, string password, string name = null, int? tenantId = null)
        {
            var user = await  _userManager.CreateUser(userName, password, name, tenantId);

            user.AddRole(_roleManager.Admin);
            user.AddRole(_roleManager.User);

            return user;
        }

        public void DeleteAdmin(int id)
        {
            if (_getAdmins().FirstOrDefault(e => e.Id == id) == null)
            {
                throw new UserFriendlyException("找不到要删除的管理员");
            }

            _userManager.DeleteUser(id);
        }

        public void UpdatePassword(int id, string password)
        {
            var user = _getAdmins().FirstOrDefault(e => e.Id == id);

            if (user == null) {
                throw new UserFriendlyException("找不到需要更新密码的管理员");
            }

            _userManager.UpdatePassword(user, password);
        }

        public void UpdatePassword(User user, string password)
        {
            if (_getAdmins().FirstOrDefault(e => e.Id == user.Id) == null) {
                throw new UserFriendlyException("找不到需要更新密码的管理员");
            }

            _userManager.UpdatePassword(user, password);
        }

        public void AddRole(User user, Role role)
        {
            if (_getAdmins().FirstOrDefault(e => e.Id == user.Id) == null)
            {
                throw new UserFriendlyException("找不到需要添加权限的管理员");
            }

            _userManager.AddUserRole(user, role);
        }

        public void Remove(User user, Role role)
        {
            if (_getAdmins().FirstOrDefault(e => e.Id == user.Id) == null)
            {
                throw new UserFriendlyException("找不到需要移除权限的管理员");
            }

            _userManager.RemoveRole(user, role);
        }
    }
}
