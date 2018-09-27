using IdentityServer4.EntityFramework.DbContexts;
using IEManageSystem.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.EntityFrameworkCore.IdentityServiceEF
{
    public class IEPersistedGrantDbContextFactory : IDesignTimeDbContextFactory<IEPersistedGrantDbContext>
    {
        public IEPersistedGrantDbContext CreateDbContext(string[] args)
        {
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            var builder = new DbContextOptionsBuilder<PersistedGrantDbContext>();
            builder.UseSqlServer(configuration.GetConnectionString(IEManageSystemConsts.IdentityServerConnectionStringName));

            return new IEPersistedGrantDbContext(builder.Options, new IdentityServer4.EntityFramework.Options.OperationalStoreOptions());
        }
    }
}
