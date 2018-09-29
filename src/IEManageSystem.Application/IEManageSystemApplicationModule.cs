using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEIdentityServer.Core;

namespace IEManageSystem
{
    [DependsOn(
        typeof(IEManageSystemCoreModule), 
        typeof(IEIdentityServerCoreModule),
        typeof(AbpAutoMapperModule))]
    public class IEManageSystemApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemApplicationModule).GetAssembly());
        }
    }
}