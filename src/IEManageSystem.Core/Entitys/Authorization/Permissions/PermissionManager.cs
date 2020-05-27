using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Events.Bus;
using Abp.UI;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Permissions
{
    public class PermissionManager:IDomainService
    {
        private IIEMemoryCache _cache { get; set; }

        public IEventBus EventBus { get; set; }

        public IEfRepository<Permission, int> PermissionRepository { get; set; }

        public PermissionManager(
            IEfRepository<Permission, int> permissionRepository,
            IIEMemoryCache cache)
        {
            PermissionRepository = permissionRepository;

            _cache = cache;

            EventBus = NullEventBus.Instance;
        }

        public Permission SuperPermission => PermissionRepository.FirstOrDefault(e => e.Name == Permission.SuperPermissionName);

        public Permission AdminPermission => PermissionRepository.FirstOrDefault(e => e.Name == Permission.AdminPermissionName);

        public Permission UserPermission => PermissionRepository.FirstOrDefault(e => e.Name == Permission.UserPermissionName);

        private string GetPermissionCacheName() => $"PermissionManager_AllPermission_";

        public List<Permission> GetPermissionsForCache() 
        {
            return _cache.GetOrCreate<List<Permission>>(GetPermissionCacheName(), cacheEntity => {

                cacheEntity.SlidingExpiration = TimeSpan.FromHours(1);

                cacheEntity.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);

                cacheEntity.SetPriority(CacheItemPriority.NeverRemove);

                PermissionRepository.NoTracking();
                // 权限数据本身不大，而且权限列表并不经常改动，但权限需要经常查询，所以这里直接缓存整个权限表
                var permissions = PermissionRepository.GetAllList();
                PermissionRepository.Tracking();

                return permissions;
            });
        }

        private void SetPermissionsInvalidForCache() 
        {
            _cache.Remove(GetPermissionCacheName());
        }

        public void Create(Permission permission)
        {
            if (PermissionRepository.GetAll().Any(e => e.Name == permission.Name))
            {
                throw new UserFriendlyException($"已有名为{permission.Name}的权限，无法重复添加");
            }

            PermissionRepository.Insert(permission);

            SetPermissionsInvalidForCache();
        }

        public void Delete(int id)
        {
            var permission = PermissionRepository.Get(id);

            if (permission.Name == Permission.SuperPermissionName) {
                throw new UserFriendlyException($"无法删除超级管理员权限");
            }

            if (permission.Name == Permission.AdminPermissionName)
            {
                throw new UserFriendlyException($"无法删除管理员权限");
            }

            if (permission.Name == Permission.UserPermissionName)
            {
                throw new UserFriendlyException($"无法用户权限");
            }

            PermissionRepository.Delete(permission);
            SetPermissionsInvalidForCache();
            EventBus.Trigger(new PermissionDeleteEventData(permission.Id, permission.Name));
        }
    }
}
