using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CommonInfrastructure
{
    [DependsOn(
        typeof(IEManageSystemCMSModule))]
    public class IEManageSystemCommonInfrastructureModule : AbpModule
    {
        public override void PreInitialize()
        {
            base.PreInitialize();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemCommonInfrastructureModule).GetAssembly());

            base.Initialize();
        }

        public override void PostInitialize()
        {
            base.PostInitialize();
        }
    }
}
