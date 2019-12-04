using Abp.Domain.Entities;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes.AuthorizationNodes
{
    public abstract class ApiScopeNode:Entity
    {
        public ICollection<ApiScopePermission> ApiScopePermissions { get; set; }

        public bool IsAllowAccess(Permission permission)
        {
            if (permission.Name == Permission.SuperPermission.Name) {
                return true;
            }

            return ApiScopePermissions.Any(e => e.PermissionId == permission.Id);
        }

        public bool IsAllowAccess(IEnumerable<Permission> permissions)
        {
            var superPermissionName = Permission.SuperPermission.Name;

            foreach (var permission in permissions)
            {
                if (IsAllowAccess(permission)) {
                    return true;
                }
            }

            return false;
        }

        public void AddPermission(Permission permission)
        {
            if (ApiScopePermissions == null)
            {
                ApiScopePermissions = new List<ApiScopePermission>();
            }

            ApiScopePermissions.Add(new ApiScopePermission(this, permission));
        }

        public void RemovePermission(Permission permission)
        {
            if (ApiScopePermissions == null)
            {
                throw new Exception("Api域权限为空");
            }

            var removeItem = ApiScopePermissions.FirstOrDefault(e => e.PermissionId == permission.Id);
            if (removeItem == null)
            {
                throw new Exception("Api域不存在该权限");
            }

            ApiScopePermissions.Remove(removeItem);
        }
    }
}
