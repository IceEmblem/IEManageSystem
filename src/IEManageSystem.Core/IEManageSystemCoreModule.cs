﻿using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Resources.Embedded;
using IEManageSystem.Localization;
using System.Reflection;

namespace IEManageSystem
{
    public class IEManageSystemCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            //Configuration.EmbeddedResources.Sources.Add(
            //    new EmbeddedResourceSet(
            //        "/Localization/SourceFiles/",
            //        Assembly.GetExecutingAssembly(),
            //        "IEManageSystem.Localization.SourceFiles"
            //    )
            //);

            IEManageSystemLocalizationConfigurer.Configure(Configuration.Localization);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemCoreModule).GetAssembly());
        }
    }
}