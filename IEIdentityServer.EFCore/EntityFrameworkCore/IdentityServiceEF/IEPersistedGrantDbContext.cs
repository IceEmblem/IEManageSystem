using Abp.Dependency;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEIdentityServer.EFCore.EntityFrameworkCore.IdentityServiceEF
{
    public class IEPersistedGrantDbContext : PersistedGrantDbContext, ITransientDependency
    {
        public IEPersistedGrantDbContext(DbContextOptions<PersistedGrantDbContext> options, OperationalStoreOptions storeOptions) : base(options, storeOptions)
        {
        }
    }
}
