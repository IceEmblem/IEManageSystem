using Abp.Domain.Entities;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Roles
{
    [Table("RolePermission")]
    public class RolePermission : Entity
    {
        public int RoleId { get; set; }

        public int PermissionId { get; set; }

        public Permission Permission { get; set; }

        protected RolePermission() {
        }

        public RolePermission(Role role, Permission permission)
        {
            RoleId = role.Id;

            PermissionId = permission.Id;

            Permission = permission;
        }
    }
}
