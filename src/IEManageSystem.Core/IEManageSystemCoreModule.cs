using Abp.Domain.Uow;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Localization;

namespace IEManageSystem
{
    public class IEManageSystemCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            IEManageSystemLocalizationConfigurer.Configure(Configuration.Localization);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IUnitOfWorkManager unitOfWorkManager = IocManager.Resolve<IUnitOfWorkManager>();

            using (var unitOfWork = unitOfWorkManager.Begin())
            {
                // 动态添加Api域
                IocManager.Resolve<InitializeSuperAdmin>().Initialize();

                unitOfWorkManager.Current.SaveChanges();

                unitOfWork.Complete();
            }
        }
    }
}