using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Interfaces;
using IdentityServer4.EntityFramework.Services;
using IdentityServer4.EntityFramework.Stores;
using IdentityServer4.Stores;
using System;
using IdentityServer4.EntityFramework.Options;
using IdentityServer4.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using IEManageSystem.Configuration;
using Microsoft.Extensions.Configuration;

namespace IEManageSystem.EntityFrameworkCore.IdentityServiceEF
{
    /// <summary>
    /// Extension methods to add EF database support to IdentityServer.
    /// </summary>
    public static class IdentityServerEntityFrameworkBuilderExtensions
    {
        /// <summary>
        /// 使用IdentityServer配置IClientStore，IResourceStore和ICorsPolicyService的EF实现。
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <param name="storeOptionsAction">The store options action.</param>
        /// <returns></returns>
        public static IIdentityServerBuilder AddConfigurationStore(
            this IIdentityServerBuilder identityServerBuilder)
        {
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            return identityServerBuilder.AddConfigurationStore(options =>
            {
                options.ConfigureDbContext = builder =>
                    builder.UseSqlServer(configuration.GetConnectionString(IEManageSystemConsts.IdentityServerConnectionStringName));
            });
        }

        /// <summary>
        /// 使用IdentityServer配置IPersistedGrantStore的EF实现。
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <param name="storeOptionsAction">The store options action.</param>
        /// <returns></returns>
        public static IIdentityServerBuilder AddOperationalStore(
            this IIdentityServerBuilder identityServerBuilder)
        {
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            return identityServerBuilder.AddOperationalStore(options =>
            {
                options.ConfigureDbContext = builder =>
                    builder.UseSqlServer(configuration.GetConnectionString(IEManageSystemConsts.IdentityServerConnectionStringName));

                // this enables automatic token cleanup. this is optional.
                options.EnableTokenCleanup = true;
                options.TokenCleanupInterval = 30;
            });
        }
    }
}
