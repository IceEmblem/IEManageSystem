using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using Abp.UI;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Entitys.Authorization.Roles
{
    public class RoleManager : IDomainService
    {
        public bool AutoSaveChanges { get; set; } = true;

        public IRepository<Role> RoleRepository { get; set; }

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public RoleManager(
            IRepository<Role> repository,
            IRepository<Permission> permissionRepository,
            IUnitOfWorkManager unitOfWorkManager)
        {
            RoleRepository = repository;

            _permissionRepository = permissionRepository;

            _unitOfWorkManager = unitOfWorkManager;
        }

        public Role SuperAdmin => RoleRepository.FirstOrDefault(e => e.Name == Role.SuperAdminName);

        public Role Admin => RoleRepository.FirstOrDefault(e => e.Name == Role.AdminName);

        public Role User => RoleRepository.FirstOrDefault(e => e.Name == Role.UserName);

        protected Task SaveChanges()
        {
            if (!AutoSaveChanges || _unitOfWorkManager.Current == null)
            {
                return Task.CompletedTask;
            }

            return _unitOfWorkManager.Current.SaveChangesAsync();
        }

        public Role GetRole(int id) => RoleRepository.Get(id);

        public IQueryable<Role> GetRoles() => RoleRepository.GetAll();

        public async Task CreateRole(Role role)
        {
            if (RoleRepository.FirstOrDefault(e => e.Name == role.Name) != null)
            {
                throw new UserFriendlyException("创建失败，已有相同名称的角色");
            }

            RoleRepository.Insert(role);

            await SaveChanges();
        }

        public void DeleteRole(int id)
        {
            RoleRepository.Delete(id);
        }

        public void AddPermission(Role role, Permission permission)
        {
            RoleRepository.EnsureCollectionLoaded(role, e => e.RolePermissions);

            List<int> permissionIds = role.RolePermissions.Select(e => e.PermissionId).ToList();

            List<Permission> permissions = _permissionRepository.GetAllList(e => permissionIds.Contains(e.Id));

            foreach (var item in permissions)
            {
                if (item == permission) {
                    return;
                }
            }

            role.AddPermission(permission);
        }

        public void RemovePermission(Role role, Permission permission)
        {
            RoleRepository.EnsureCollectionLoaded(role, e => e.RolePermissions);

            role.RemovePermission(permission);
        }
    }
}
