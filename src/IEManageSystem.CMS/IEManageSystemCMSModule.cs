using Abp.Modules;
using Abp.Reflection.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS
{
    [DependsOn(
        typeof(IEManageSystemCoreModule))]
    public class IEManageSystemCMSModule:AbpModule
    {
        public override void PreInitialize()
        {
            base.PreInitialize();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemCMSModule).GetAssembly());

            base.Initialize();
        }

        public override void PostInitialize()
        {
            base.PostInitialize();
        }
    }
}
