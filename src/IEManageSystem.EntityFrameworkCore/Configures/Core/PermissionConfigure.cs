using IEManageSystem.Entitys.Authorization.Permissions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.Core
{
    public class PermissionConfigure : IEntityTypeConfiguration<Permission>
    {
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.HasIndex(e => e.Name).IsUnique();

            builder.HasData(
                new
                {
                    Id = 1,
                    Name = Permission.SuperPermissionName,
                    DisplayName = "超级管理员权限",
                    Describe = "超级管理员权限"
                },
                new
                {
                    Id = 2,
                    Name = Permission.AdminPermissionName,
                    DisplayName = "管理员权限",
                    Describe = "管理员权限"
                },
                new
                {
                    Id = 3,
                    Name = Permission.UserPermissionName,
                    DisplayName = "用户权限",
                    Describe = "用户权限"
                });
        }
    }
}
