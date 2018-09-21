using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.Api.Startup;
using IEManageSystem.Configuration;
using IEManageSystem.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace IEManageSystem.Web.Startup
{
    [DependsOn(
        // typeof(IEManageSystemApplicationModule), 
        typeof(IEManageSystemWebHostModule),
        typeof(IEManageSystemEntityFrameworkCoreModule), 
        typeof(AbpAspNetCoreModule))]
    public class IEManageSystemWebModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public IEManageSystemWebModule(IHostingEnvironment env)
        {
            _appConfiguration = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName);
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(IEManageSystemConsts.ConnectionStringName);

            Configuration.Navigation.Providers.Add<IEManageSystemNavigationProvider>();

            //Configuration.Modules.AbpAspNetCore()
            //    .CreateControllersForAppServices(
            //        typeof(IEManageSystemApplicationModule).GetAssembly()
            //    );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemWebModule).GetAssembly());
        }
    }
}