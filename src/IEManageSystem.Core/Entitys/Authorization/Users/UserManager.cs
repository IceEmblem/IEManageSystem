using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using Abp.UI;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Entitys.Authorization.Users.Accounts;
using IEManageSystem.Repositorys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityAction.Other;

namespace IEManageSystem.Entitys.Authorization.Users
{
    public class UserManager:IDomainService
    {
        public IEfRepository<User, int> UserRepository { get; private set; }

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        private RoleManager _roleManager { get; set; }

        private IRepository<Role> _roleRepository => _roleManager.RoleRepository;

        public bool AutoSaveChanges { get; set; } = true;

        public UserManager(
            IEfRepository<User, int> userRepository,
            RoleManager roleManager,
            IUnitOfWorkManager unitOfWorkManager
            )
        {
            UserRepository = userRepository;

            _roleManager = roleManager;

            _unitOfWorkManager = unitOfWorkManager;
        }

        protected Task SaveChanges()
        {
            if (!AutoSaveChanges || _unitOfWorkManager.Current == null)
            {
                return Task.CompletedTask;
            }

            return _unitOfWorkManager.Current.SaveChangesAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public User GetUser(int id)
        {
            return UserRepository.Get(id);
        }

        public User GetUserForUserName(string userName)
        {
            return UserRepository.FirstOrDefault(e=>e.Account.UserName == userName);
        }

        /// <summary>
        /// 验证密码
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool ValidatePassword(User user, string password)
        {
            UserRepository.EnsurePropertyLoaded(user, e => e.Account);

            // 验证密码
            password = Encrypt.MD5Utf8(password);

            if (user.Account.Password == password) {
                return true;
            }

            return false;
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="name"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        public async Task<User> CreateUser(string userName, string password, string name = null, int? tenantId = null)
        {
            if ((UserRepository.GetAllList(e => e.Account.UserName == userName)).Any())
            {
                throw new UserFriendlyException("已存在[" + userName + "]的账号，请重新注册");
            }

            password = Encrypt.MD5Utf8(password);

            Account account = new Account(userName)
            {
                Password = password,
            };

            User user = new User(account)
            {
                Name = !string.IsNullOrEmpty(name) ? name : userName,
                TenantId = tenantId
            };

            user.AddRole(_roleManager.User);

            UserRepository.Insert(user);
            await SaveChanges();

            return user;
        }

        /// <summary>
        /// 更新密码
        /// </summary>
        /// <param name="password"></param>
        public void UpdatePassword(User user, string password)
        {
            password = Encrypt.MD5Utf8(password);

            user.Account.Password = password;
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        public void DeleteUser(int id)
        {
            var user = UserRepository.FirstOrDefault(id);

            if (user == null)
            {
                throw new UserFriendlyException("找不到要删除的用户");
            }

            UserRepository.EnsureCollectionLoaded(user, e => e.UserRoles);

            UserRepository.Delete(id);
        }

        /// <summary>
        /// 添加权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        public void AddUserRole(User user, Role role)
        {
            if (role.IsSuperAdmin()) {
                throw new UserFriendlyException("无法添加超级管理员角色");
            }

            UserRepository.EnsureCollectionLoaded(user, e => e.UserRoles);

            List<int> roleIds = user.UserRoles.Select(e => e.RoleId).ToList();

            List<Role> roles = _roleRepository.GetAllList(e => roleIds.Contains(e.Id));

            foreach (var item in roles)
            {
                if (item == role)
                {
                    return;
                }
            }

            user.AddRole(role);
        }

        /// <summary>
        /// 移除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        public void RemoveRole(User user, Role role)
        {
            if (role.IsSuperAdmin())
            {
                throw new UserFriendlyException("无法移除超级管理员角色");
            }

            UserRepository.EnsureCollectionLoaded(user, e => e.UserRoles);

            var userRole = user.UserRoles.FirstOrDefault(e => e.RoleId == role.Id);

            user.UserRoles.Remove(userRole);
        }
    }
}
