using IdentityServer4.EntityFramework.DbContexts;
using IEIdentityServer.Core.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IEIdentityServer.EFCore.EntityFrameworkCore.IdentityServiceEF
{
    public class IEPersistedGrantDbContextFactory : IDesignTimeDbContextFactory<IEPersistedGrantDbContext>
    {
        public IEPersistedGrantDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<PersistedGrantDbContext>();
            builder.UseSqlServer(IEIdentityServerConfigurations.GetIEIdentityServerConnectionString());

            return new IEPersistedGrantDbContext(builder.Options, new IdentityServer4.EntityFramework.Options.OperationalStoreOptions());
        }
    }
}
