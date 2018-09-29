using Abp.Modules;
using Abp.Reflection.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEIdentityServer.Core
{
    [DependsOn()]
    public class IEIdentityServerCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEIdentityServerCoreModule).GetAssembly());
        }
    }
}
