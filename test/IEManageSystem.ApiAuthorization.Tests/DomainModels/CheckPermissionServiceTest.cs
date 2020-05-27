using Abp.Domain.Uow;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using System.Linq;
using IEManageSystem.Entitys.Authorization.Permissions;

namespace IEManageSystem.ApiAuthorization.Tests.DomainModels
{
    public class CheckPermissionServiceTest : IEManageSystemTestBase
    {
        private CheckPermissionService _checkPermissionService { get; set; }

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        public CheckPermissionServiceTest() 
        {
            _checkPermissionService = Resolve<CheckPermissionService>();

            _unitOfWorkManager = Resolve<IUnitOfWorkManager>();
        }

        [Fact]
        public void IsAllowAccess_BaseTest() 
        {
            UsingDbContext(context => context.Database.EnsureDeleted());
            UsingDbContext(context => context.Database.EnsureCreated());
            UsingDbContext(context => new PermissionBuilder(context).Build());
            UsingDbContext(context => new ApiScopeBuilder(context).Build());

            using(var tran = _unitOfWorkManager.Begin()) 
            {
                Assert.True(_checkPermissionService.IsAllowAccess("ApiScope1", false, new List<string> { "Permission1" }));
            }
        }

        /// <summary>
        /// 权限被删除后，不允许访问
        /// </summary>
        [Fact]
        public void IsAllowAccess_DeleteTest() 
        {
            UsingDbContext(context => context.Database.EnsureDeleted());
            UsingDbContext(context => context.Database.EnsureCreated());
            UsingDbContext(context => new PermissionBuilder(context).Build());
            UsingDbContext(context => new ApiScopeBuilder(context).Build());

            using (var tran = _unitOfWorkManager.Begin())
            {
                Assert.True(_checkPermissionService.IsAllowAccess("ApiScope1", false, new List<string> { "Permission1" }));

                var context = Resolve<IEManageSystemDbContext>();
                var permission = context.Permissions.FirstOrDefault(e => e.Name == "Permission1");
                var permissionManager = Resolve<PermissionManager>();
                permissionManager.Delete(permission.Id);
                context.SaveChanges();

                tran.Complete();
            }


            using (var tran = _unitOfWorkManager.Begin())
            {
                var newCheckPermissionService = Resolve<CheckPermissionService>();

                Assert.True(!newCheckPermissionService.IsAllowAccess("ApiScope1", false, new List<string> { "Permission1" }));
            }
        }
    }
}
