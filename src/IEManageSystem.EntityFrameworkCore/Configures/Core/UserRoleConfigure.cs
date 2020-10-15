using IEManageSystem.Entitys.Authorization.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.Core
{
    public class UserRoleConfigure : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.HasData(
                new { 
                    Id = 1,
                    UserId = 1,
                    RoleId = 1,
                    Account = 1,
                });
        }
    }
}
