using System.Collections.Concurrent;
using System.IO;
using Abp.Extensions;
using Microsoft.Extensions.Configuration;

namespace IEManageSystem.Configuration
{
    /// <summary>
    /// 请通过此类来获取 IConfigurationRoot，因为ABP未注册 IConfigurationRoot 到依赖注入容器
    /// </summary>
    public static class AppConfigurations
    {
        public static string RootPath { get { return $"{ Directory.GetCurrentDirectory()}//wwwroot"; } }

        private static readonly ConcurrentDictionary<string, IConfigurationRoot> ConfigurationCache;

        static AppConfigurations()
        {
            ConfigurationCache = new ConcurrentDictionary<string, IConfigurationRoot>();
        }

        public static IConfigurationRoot Get(string path, string environmentName = null)
        {
            var cacheKey = path + "#" + environmentName;
            return ConfigurationCache.GetOrAdd(
                cacheKey,
                _ => BuildConfiguration(path, environmentName)
            );
        }

        private static IConfigurationRoot BuildConfiguration(string path, string environmentName = null)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            if (!environmentName.IsNullOrWhiteSpace())
            {
                builder = builder.AddJsonFile($"appsettings.{environmentName}.json", optional: true);
            }
            
            builder = builder.AddEnvironmentVariables();

            return builder.Build();
        }
    }
}
