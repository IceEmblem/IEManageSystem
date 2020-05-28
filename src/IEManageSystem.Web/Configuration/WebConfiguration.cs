using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Configuration
{
    public static class WebConfiguration
    {
        public static string Issuer { get; private set; }

        public static string Audience { get; private set; }

        public static string SymmetricKey { get; private set; }

        public static void Init(IConfiguration appConfiguration)
        {
            Issuer = appConfiguration.GetSection("WebConfiguration:Issuer").Value;

            Audience = appConfiguration.GetSection("WebConfiguration:Audience").Value;

            SymmetricKey = appConfiguration.GetSection("WebConfiguration:SymmetricKey").Value;

            if (string.IsNullOrWhiteSpace(SymmetricKey)) {
                SymmetricKey = Guid.NewGuid().ToString();
            }
        }
    }
}
