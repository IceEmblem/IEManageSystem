using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace IEManageSystem
{
    [DependsOn(
        typeof(IEManageSystemCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class IEManageSystemApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemApplicationModule).GetAssembly());
        }
    }
}