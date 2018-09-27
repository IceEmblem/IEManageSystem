using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Contexts
{
    public class PGDbContextFactory : IDesignTimeDbContextFactory<PGDbContext>
    {
        const string connectionString = @"Data Source=(localdb)\ProjectsV13;Initial Catalog=IdentityServiceDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public PGDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<PersistedGrantDbContext>();
            builder.UseSqlServer(connectionString);

            return new PGDbContext(builder.Options, new IdentityServer4.EntityFramework.Options.OperationalStoreOptions());
        }
    }
}
