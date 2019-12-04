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
            InitializeSuperAdmin initializeSuperAdmin = IocManager.Resolve<InitializeSuperAdmin>();

            initializeSuperAdmin.Initialize();
        }
    }
}