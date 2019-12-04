using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.Web.Startup;
namespace IEManageSystem.Web.Tests
{
    [DependsOn(
        typeof(IEManageSystemWebModule),
        typeof(AbpAspNetCoreTestBaseModule)
        )]
    public class IEManageSystemWebTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemWebTestModule).GetAssembly());
        }
    }
}