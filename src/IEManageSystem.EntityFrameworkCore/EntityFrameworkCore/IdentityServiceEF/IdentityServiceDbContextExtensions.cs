using Abp.EntityFrameworkCore;
using IdentityServer4.EntityFramework.DbContexts;
using IEManageSystem.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.EntityFrameworkCore.IdentityServiceEF
{
    public static class IdentityServiceDbContextExtensions
    {
        public static IServiceCollection AddIdentityServiceDbContext(this IServiceCollection services)
        {
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            var builder = new DbContextOptionsBuilder<ConfigurationDbContext>();
            builder.UseSqlServer(configuration.GetConnectionString(IEManageSystemConsts.IdentityServerConnectionStringName));

            return services
                       .AddSingleton<DbContextOptions<ConfigurationDbContext>>(builder.Options)
                       .AddScoped<IDbContextProvider<IEConfigurationDbContext>, IEConfigurationDbContextProvider>();
        }
    }
}
