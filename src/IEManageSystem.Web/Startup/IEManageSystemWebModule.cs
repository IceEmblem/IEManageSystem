using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.Domain.Uow;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.Web.Help;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CommonInfrastructure;
using IEManageSystem.Configuration;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.JwtAuthentication;
using IEManageSystem.Web.Filters;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Configuration;

namespace IEManageSystem.Web.Startup
{
    [DependsOn(
        typeof(IEJwtAuthenticationModule),
        typeof(IEManageSystemApplicationModule), 
        typeof(IEManageSystemEntityFrameworkCoreModule), 
        typeof(IEManageSystemCommonInfrastructureModule),
        typeof(AbpAspNetCoreModule))]
    public class IEManageSystemWebModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public IEManageSystemWebModule(IWebHostEnvironment env)
        {
            _appConfiguration = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName);
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(IEManageSystemConsts.ConnectionStringName);

            Configuration.Modules.AbpAspNetCore()
                 .CreateControllersForAppServices(
                     typeof(IEManageSystemApplicationModule).GetAssembly()
                 )
                 .ConfigureControllerModel(controllerModel =>
                 {
                     foreach (var action in controllerModel.Actions)
                     {
                         foreach (var selector in action.Selectors)
                         {
                             if (selector.AttributeRouteModel == null)
                             {
                                 // 为方法添加路由
                                 selector.AttributeRouteModel = new AttributeRouteModel(
                                     new RouteAttribute(
                                         IEUrlHelper.CreateUrl(controllerModel.ControllerName, action.ActionName)
                                     )
                                 );
                             }
                         }
                     }
                 });
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemWebModule).GetAssembly());
        }
    }
}