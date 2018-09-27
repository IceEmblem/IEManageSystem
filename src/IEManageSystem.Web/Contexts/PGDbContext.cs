using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Contexts
{
    public class PGDbContext : PersistedGrantDbContext
    {
        public PGDbContext(DbContextOptions<PersistedGrantDbContext> options, OperationalStoreOptions storeOptions) : base(options, storeOptions)
        {
        }
    }
}
