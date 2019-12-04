using Abp.EntityFrameworkCore;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.MicroKernel.Registration;
using IEManageSystem.Repositorys;

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

            IocManager.IocContainer.Register(
                // 泛型注册，IRepositoryEx<> 接口使用 RepositoryEx<> 实例
                Component.For(typeof(IEfRepository<,>)).ImplementedBy(typeof(EfRepository<,>)).LifestyleTransient()
            );
        }
    }
}