using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using IEManageSystem.Entitys.Authorization.Roles;

namespace IEManageSystem.Tests.TestDatas
{
    /// <summary>
    /// 需先执行 PermissionBuilder
    /// </summary>
    public class RoleBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public RoleBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var permission = _context.Permissions.FirstOrDefault(e => e.Name == "Permission1");

            var role = new Role("Role1")
            {
                RolePermissions = new List<RolePermission>()
            };

            role.RolePermissions.Add(new RolePermission(role, permission));

            _context.Roles.Add(role);
        }
    }
}
