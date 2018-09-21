using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.Configuration;
using Abp.Zero.Configuration;
using Abp.AspNetCore.Configuration;
using IEManageSystem.EntityFrameworkCore;
using Abp.AspNetCore;
using IEManageSystem.Api.Configuration;

namespace IEManageSystem.Api.Startup
{
    [DependsOn(
        typeof(IEManageSystemApplicationModule),
        typeof(AbpAspNetCoreModule)
    )]
    public class IEManageSystemWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public IEManageSystemWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            //Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            //    IEManageSystemConsts.ConnectionStringName
            //);

            // Use database for language management
            // Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            //Configuration.Modules.AbpAspNetCore()
            //     .CreateControllersForAppServices(
            //         typeof(IEManageSystemApplicationModule).GetAssembly()
            //     );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemWebHostModule).GetAssembly());
        }
    }
}
