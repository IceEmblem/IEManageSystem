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
    public class IEConfigurationDbContext : ConfigurationDbContext, ITransientDependency
    {
        public IEConfigurationDbContext(DbContextOptions<ConfigurationDbContext> options) : base(options, new ConfigurationStoreOptions())
        {
        }
    }
}
