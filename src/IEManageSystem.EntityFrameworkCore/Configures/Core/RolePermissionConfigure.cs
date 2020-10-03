using IEManageSystem.Entitys.Authorization.Roles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.Core
{
    public class RolePermissionConfigure : IEntityTypeConfiguration<RolePermission>
    {
        public void Configure(EntityTypeBuilder<RolePermission> builder)
        {
            builder.HasData(
                new
                {
                    Id = 1,
                    RoleId = 1,
                    PermissionId = 1,
                },
                new
                {
                    Id = 2,
                    RoleId = 2,
                    PermissionId = 2,
                },
                new
                {
                    Id = 3,
                    RoleId = 3,
                    PermissionId = 3,
                });
        }
    }
}
