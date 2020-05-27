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
        }
    }
}
