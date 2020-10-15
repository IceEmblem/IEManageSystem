using IEManageSystem.Entitys.Authorization.Users.Accounts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.Core
{
    public class AccountConfigure : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.OwnsOne(e => e.SafetyProblem);
            builder.HasIndex(e => e.UserName).IsUnique();

            builder.HasData(
                new { 
                    Id = 1,
                    UserName = "SuperAdmin",
                    // 密码 123456
                    Password = "E1-0A-DC-39-49-BA-59-AB-BE-56-E0-57-F2-0F-88-3E"
                });
        }
    }
}
