using IdentityServer4.EntityFramework.DbContexts;
using IEIdentityServer.Core.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEIdentityServer.EFCore.EntityFrameworkCore.IdentityServiceEF
{
    public class IEConfigurationDbContextFactory : IDesignTimeDbContextFactory<IEConfigurationDbContext>
    {
        public IEConfigurationDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ConfigurationDbContext>();
            builder.UseSqlServer(IEIdentityServerConfigurations.GetIEIdentityServerConnectionString());

            return new IEConfigurationDbContext(builder.Options);
        }
    }
}
