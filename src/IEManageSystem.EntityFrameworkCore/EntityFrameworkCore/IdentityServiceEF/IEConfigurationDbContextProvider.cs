using Abp.EntityFrameworkCore;
using Abp.MultiTenancy;
using IdentityServer4.EntityFramework.DbContexts;
using IEManageSystem.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.EntityFrameworkCore.IdentityServiceEF
{
    public class IEConfigurationDbContextProvider : IDbContextProvider<IEConfigurationDbContext>
    {
        private DbContextOptions<ConfigurationDbContext> _dbContextOptions { get; set; }

        public IEConfigurationDbContextProvider(
            DbContextOptions<ConfigurationDbContext> dbContextOptions
            )
        {
            _dbContextOptions = dbContextOptions;
        }

        public IEConfigurationDbContext GetDbContext()
        {
            return new IEConfigurationDbContext(_dbContextOptions);
        }

        public IEConfigurationDbContext GetDbContext(MultiTenancySides? multiTenancySide)
        {
            return GetDbContext();
        }
    }
}
