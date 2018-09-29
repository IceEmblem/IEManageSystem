using Abp.EntityFrameworkCore;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.MicroKernel.Registration;

namespace IEManageSystem.EntityFrameworkCore.IEManageSystemEF
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