using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Contexts
{
    public class IEConfigurationDbContextFactory : IDesignTimeDbContextFactory<IEConfigurationDbContext>
    {
        const string connectionString = @"Data Source=(localdb)\ProjectsV13;Initial Catalog=IdentityServiceDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public IEConfigurationDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ConfigurationDbContext>();
            builder.UseSqlServer(connectionString);

            return new IEConfigurationDbContext(builder.Options, new IdentityServer4.EntityFramework.Options.ConfigurationStoreOptions());
        }
    }
}
