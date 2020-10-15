using IEManageSystem.Entitys.Authorization.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.Core
{
    public class UserConfigure : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData(
                new {
                    Id = 1,
                    Name = "超级管理员",
                    Sex = true,
                    BirthDate = DateTime.Now,
                    AccountId = 1
                });
        }
    }
}
