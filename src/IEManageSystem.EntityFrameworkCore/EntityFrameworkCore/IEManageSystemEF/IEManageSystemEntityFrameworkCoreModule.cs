using Abp.EntityFrameworkCore;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.MicroKernel.Registration;
using IEManageSystem.CustomRepositoryI;
using IEManageSystem.Repositories;

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

            IocManager.IocContainer.Register(
                    Component.For(typeof(IRepositoryIdentityConfig<>)).ImplementedBy(typeof(RepositoryIdentityConfig<>)).LifestyleTransient(),
                    Component.For(typeof(IRepositoryIdentityConfig<,>)).ImplementedBy(typeof(RepositoryIdentityConfig<,>)).LifestyleTransient()
                );
        }
    }
}