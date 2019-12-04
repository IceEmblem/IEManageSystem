using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Permissions
{
    public class PermissionManager:IDomainService
    {
        public IRepository<Permission> PermissionRepository { get; set; }

        public PermissionManager(
            IRepository<Permission> permissionRepository)
        {
            PermissionRepository = permissionRepository;
        }

        public Permission SuperPermission => PermissionRepository.FirstOrDefault(e => e.Name == Permission.SuperPermissionName);

        public Permission AdminPermission => PermissionRepository.FirstOrDefault(e => e.Name == Permission.AdminPermissionName);

        public Permission UserPermission => PermissionRepository.FirstOrDefault(e => e.Name == Permission.UserPermissionName);

        public void Create(Permission permission)
        {
            if (PermissionRepository.GetAll().Any(e => e.Name == permission.Name))
            {
                throw new UserFriendlyException($"已有名为{permission.Name}的权限，无法重复添加");
            }

            PermissionRepository.Insert(permission);
        }

        public void Delete(int Id)
        {
            PermissionRepository.Delete(Id);
        }
    }
}
