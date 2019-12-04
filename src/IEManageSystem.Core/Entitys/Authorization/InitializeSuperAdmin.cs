using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using Castle.Core.Logging;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UtilityAction.Other;

namespace IEManageSystem.Entitys.Authorization
{
    public class InitializeSuperAdmin:IDomainService
    {
        public ILogger Logger { get; set; }

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        private UserManager _userManager { get; set; }

        private RoleManager _roleManager { get; set; }

        private PermissionManager _permissionManager { get; set; }

        public InitializeSuperAdmin(
            UserManager userManager,
            RoleManager roleManager,
            IUnitOfWorkManager unitOfWorkManager,
            PermissionManager permissionManager)
        {
            Logger = NullLogger.Instance;

            _userManager = userManager;

            _roleManager = roleManager;

            _unitOfWorkManager = unitOfWorkManager;

            _permissionManager = permissionManager;
        }

        public void Initialize()
        {
            if (_userManager.UserRepository.Count() > 0) {
                return;
            }

            using (var unitOfWork = _unitOfWorkManager.Begin())
            {
                try
                {
                    var superPermission = Permission.SuperPermission;

                    _permissionManager.Create(superPermission);

                    var adminPermission = Permission.AdminPermission;

                    _permissionManager.Create(adminPermission);

                    var userPermission = Permission.UserPermission;

                    _permissionManager.Create(userPermission);


                    _unitOfWorkManager.Current.SaveChangesAsync();


                    var superAdminRole = Role.SuperAdmin;

                    _roleManager.CreateRole(superAdminRole).Wait();

                    _roleManager.AddPermission(superAdminRole, superPermission);


                    var adminRole = Role.Admin;

                    _roleManager.CreateRole(adminRole).Wait();

                    _roleManager.AddPermission(adminRole, adminPermission);


                    var userRole = Role.User;

                    _roleManager.CreateRole(userRole).Wait();

                    _roleManager.AddPermission(userRole, userPermission);


                    _unitOfWorkManager.Current.SaveChangesAsync();


                    User superAdmin = _userManager.CreateUser("SuperAdmin", "123456", "超级管理员").Result;

                    _userManager.AddUserRole(superAdmin, superAdminRole);

                    unitOfWork.Complete();
                }
                catch(Exception ex)
                {
                    Logger.Error(ex.Message);
                }
            }
        }
    }
}
