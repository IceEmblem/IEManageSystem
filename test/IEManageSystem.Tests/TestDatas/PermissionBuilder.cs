using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Tests.TestDatas
{
    public class PermissionBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public PermissionBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var permission = new Permission("Permission1")
            {
                DisplayName = "权限1",
                Describe = "这是一个测试权限"
            };

            _context.Permissions.Add(permission);
        }
    }
}
