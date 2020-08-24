using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Permissions
{
    [Table("Permission")]
    public class Permission : Entity
    {
        public const string SuperPermissionName = "SuperPermission";

        public static Permission SuperPermission => new Permission(SuperPermissionName) { DisplayName = "超级权限", Describe = "站点最高权限" };

        public const string AdminPermissionName = "AdminPermission";

        public static Permission AdminPermission => new Permission(AdminPermissionName) { DisplayName = "管理员权限", Describe = "站点管理员权限" };

        public const string UserPermissionName = "UserPermission";

        public static Permission UserPermission => new Permission(UserPermissionName) { DisplayName = "用户权限", Describe = "普通用户权限" };

        public string Name { get; protected set; }

        public string DisplayName { get; set; }

        public string Describe { get; set; }

        protected Permission()
        {
        }

        public Permission(string name)
        {
            Name = name;
        }

        public bool IsSuperPermission() {
            return Name == SuperPermissionName;
        }
    }
}
