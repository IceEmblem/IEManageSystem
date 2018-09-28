using Abp.Dependency;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using IEManageSystem.Entitys.IdentityService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.EntityFrameworkCore.IdentityServiceEF
{
    public class IEConfigurationDbContext : ConfigurationDbContext, ITransientDependency
    {
        public IEConfigurationDbContext(DbContextOptions<ConfigurationDbContext> options) : base(options, new ConfigurationStoreOptions())
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        public DbSet<IEIdentityResource> IEIdentityResources { get; set; }

        // public DbSet<IdentityClaim> IdentityClaims { get; set; }
    }
}
