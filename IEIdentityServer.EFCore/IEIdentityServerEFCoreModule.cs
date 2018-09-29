using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.MicroKernel.Registration;
using IEIdentityServer.Core;
using IEIdentityServer.Core.RepositoriesI;
using IEIdentityServer.EFCore.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEIdentityServer.EFCore
{
    [DependsOn(
        typeof(IEIdentityServerCoreModule))]
    public class IEIdentityServerEFCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEIdentityServerEFCoreModule).GetAssembly());

            IocManager.IocContainer.Register(
                    Component.For(typeof(IIEIdentityServerRepository<>)).ImplementedBy(typeof(IEIdentityServerRepository<>)).LifestyleTransient()
                );
        }
    }
}
