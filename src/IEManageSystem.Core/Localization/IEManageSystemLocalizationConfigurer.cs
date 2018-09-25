using System.Reflection;
using Abp.Configuration.Startup;
using Abp.Localization;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Json;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace IEManageSystem.Localization
{
    public static class IEManageSystemLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Languages.Add(new LanguageInfo("chs", "简体中文", isDefault: true));
            localizationConfiguration.Languages.Add(new LanguageInfo("en", "English", "famfamfam-flags england"));
            localizationConfiguration.Languages.Add(new LanguageInfo("tr", "Türkçe", "famfamfam-flags tr"));

            //string _namespace = typeof(IEManageSystemLocalizationConfigurer).Namespace;
            //var assembly = typeof(IEManageSystemLocalizationConfigurer).GetAssembly();
            //var a = assembly.GetManifestResourceStream("IEManageSystem.Localization.SourceFiles.IEManageSystem.json");
            //var b = assembly.GetManifestResourceNames();

            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(IEManageSystemConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(IEManageSystemLocalizationConfigurer).GetAssembly(),
                        "IEManageSystem.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}