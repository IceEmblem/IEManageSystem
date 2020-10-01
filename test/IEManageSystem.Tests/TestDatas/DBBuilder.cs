using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Tests.TestDatas
{
    public class DBBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public DBBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            new LogicBuilder(_context).Build();
            _context.SaveChanges();

            new PermissionBuilder(_context).Build();
            _context.SaveChanges();
            new RoleBuilder(_context).Build();
            _context.SaveChanges();
            new UserBuilder(_context).Build();
            _context.SaveChanges();

            new ApiScopeBuilder(_context).Build();
            _context.SaveChanges();

            new ContentPagePermissionCollectionBuilder(_context).Build();
            _context.SaveChanges();

            new PageDataBuilder(_context).Build();
            _context.SaveChanges();

            new MenuBuilder(_context).Build();
            _context.SaveChanges();
        }
    }
}
