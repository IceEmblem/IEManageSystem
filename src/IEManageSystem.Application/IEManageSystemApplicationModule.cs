using Abp.AutoMapper;
using Abp.Domain.Uow;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.CMS;

namespace IEManageSystem
{
    [DependsOn(
        typeof(IEManageSystemCoreModule),
        typeof(IEApiAuthorizationModule),
        typeof(IEManageSystemCMSModule),
        typeof(AbpAutoMapperModule))]
    public class IEManageSystemApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemApplicationModule).GetAssembly());
        }

        public override void PostInitialize()
        {
        }
    }
}