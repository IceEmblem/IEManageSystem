using Abp.Modules;
using Abp.Reflection.Extensions;
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
    }
}