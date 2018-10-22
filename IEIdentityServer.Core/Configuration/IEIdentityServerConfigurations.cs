using System;
using System.Collections.Concurrent;
using System.IO;
using System.Linq;
using Abp.Extensions;
using Microsoft.Extensions.Configuration;

namespace IEIdentityServer.Core.Configuration
{
    public static class IEIdentityServerConfigurations
    {
        private static string IEIdentityServerConnectionString { get; set; } = null;

        public static string GetIEIdentityServerConnectionString()
        {
            if (IEIdentityServerConnectionString != null) {
                return IEIdentityServerConnectionString;
            }

            var coreAssemblyDirectoryPath = Path.GetDirectoryName(AppContext.BaseDirectory);
            if (coreAssemblyDirectoryPath == null)
            {
                throw new Exception("Could not find location of IEManageSystem.Core assembly!");
            }

            var directoryInfo = new DirectoryInfo(coreAssemblyDirectoryPath);
            while (!Directory.GetFiles(directoryInfo.FullName).Any(filePath => string.Equals(Path.GetFileName(filePath), "IEManageSystem.sln")))
            {
                if (directoryInfo.Parent == null)
                {
                    throw new Exception("Could not find content root folder!");
                }

                directoryInfo = directoryInfo.Parent;
            }

            string path = Path.Combine(directoryInfo.FullName, $"src{Path.DirectorySeparatorChar}IEManageSystem.Web");

            var configurationbuilder = new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            var configuration = configurationbuilder.AddEnvironmentVariables().Build();

            IEIdentityServerConnectionString = configuration.GetConnectionString("IdentityServer");
            if (string.IsNullOrEmpty(IEIdentityServerConnectionString)) {
                throw new Exception("请配置IdentityServer的连接字符串");
            }

            return IEIdentityServerConnectionString;
        }
    }
}
