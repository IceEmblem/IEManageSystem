using Abp.Modules;
using Abp.Reflection.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.JwtAuthentication
{
    [DependsOn()]
    public class IEJwtAuthenticationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEJwtAuthenticationModule).GetAssembly());
        }
    }
}
