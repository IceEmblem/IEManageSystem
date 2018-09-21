using Abp.EntityFrameworkCore;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace IEManageSystem.EntityFrameworkCore
{
    [DependsOn(
        typeof(IEManageSystemCoreModule), 
        typeof(AbpEntityFrameworkCoreModule))]
    public class IEManageSystemEntityFrameworkCoreModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemEntityFrameworkCoreModule).GetAssembly());
        }
    }
}