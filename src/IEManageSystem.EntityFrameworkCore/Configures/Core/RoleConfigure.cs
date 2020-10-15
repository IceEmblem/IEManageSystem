using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Entitys.Authorization.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.Core
{
    public class RoleConfigure : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasIndex(e => e.Name).IsUnique();

            builder.HasData(
                new {
                    Id = 1,
                    Name = Role.SuperAdminName,
                    DisplayName = "超级管理员角色",
                    Describe = "超级管理员角色",
                },
                new
                {
                    Id = 2,
                    Name = Role.AdminName,
                    DisplayName = "管理员角色",
                    Describe = "管理员角色",
                },
                new
                {
                    Id = 3,
                    Name = Role.UserName,
                    DisplayName = "用户角色",
                    Describe = "用户角色",
                });
        }
    }
}
