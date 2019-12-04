using Abp.Domain.Repositories;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization
{
    [DependsOn(
        typeof(IEManageSystemCoreModule))]
    public class IEApiAuthorizationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEApiAuthorizationModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            
        }
    }
}
