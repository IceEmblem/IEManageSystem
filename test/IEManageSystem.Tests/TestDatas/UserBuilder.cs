using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Tests.TestDatas
{
    /// <summary>
    /// 需先执行 RoleBuilder
    /// </summary>
    public class UserBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public UserBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var role = _context.Roles.FirstOrDefault(e => e.Name == "Role1");

            var user = new Entitys.Authorization.Users.User(new Entitys.Authorization.Users.Accounts.Account("admini"))
            {
                Id = 1,
                Name = "User1",
                UserRoles = new List<UserRole>()
            };

            user.UserRoles.Add(new UserRole(user, role));

            _context.Users.Add(user);


            var user2 = new Entitys.Authorization.Users.User(new Entitys.Authorization.Users.Accounts.Account("admini2"))
            {
                Id = 2,
                Name = "User2",
                UserRoles = new List<UserRole>()
            };

            user2.UserRoles.Add(new UserRole(user2, role));

            _context.Users.Add(user2);
        }
    }
}
