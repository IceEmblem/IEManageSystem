using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace IEManageSystem.Tests.TestDatas
{
    /// <summary>
    /// 使用数据前，请执行 PermissionBuilder
    /// </summary>
    public class ApiScopeBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public ApiScopeBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var permission = _context.Permissions.FirstOrDefault(e => e.Name == "Permission1");
            var apiScope = new ApiScope("ApiScope1", "Api域1");
            apiScope.ApiManageScope.AddPermission(permission);
            apiScope.ApiQueryScope.AddPermission(permission);

            _context.ApiScopes.Add(apiScope);
        }
    }
}
