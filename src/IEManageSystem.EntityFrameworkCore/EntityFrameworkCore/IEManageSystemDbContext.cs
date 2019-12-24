using Abp.EntityFrameworkCore;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.CMS.DomainModel;
using IEManageSystem.CMS.DomainModel.Menus;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Common.DomainModel;
using IEManageSystem.Configures.ApiAuthorization;
using IEManageSystem.Configures.CMS;
using IEManageSystem.Configures.Core;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Entitys.Authorization.Users;
using Microsoft.EntityFrameworkCore;

namespace IEManageSystem.EntityFrameworkCore
{
    public class IEManageSystemDbContext : AbpDbContext
    {
        //Add DbSet properties for your entities...

        public IEManageSystemDbContext(DbContextOptions<IEManageSystemDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 配置Api认证
            modelBuilder.ApplyConfiguration(new ApiScopeNodeConfigure());

            // 配置Core
            modelBuilder.ApplyConfiguration(new UserConfigure());
            modelBuilder.ApplyConfiguration(new AccountConfigure());

            // 配置CMS
            modelBuilder.ApplyConfiguration(new StaticPageConfigure());
            modelBuilder.ApplyConfiguration(new ContentPageConfigure());
            modelBuilder.ApplyConfiguration(new PageDataConfigure());
            modelBuilder.ApplyConfiguration(new CompositeComponentConfigure());
            modelBuilder.ApplyConfiguration(new LeafComponentConfigure());
            modelBuilder.ApplyConfiguration(new PageLeafComponentConfigure());
            modelBuilder.ApplyConfiguration(new LeafMenuConfigure());
            modelBuilder.ApplyConfiguration(new CompositeMenuConfigure());
            modelBuilder.ApplyConfiguration(new PageComponentBaseConfigure());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Permission> Permissions { get; set; }

        public DbSet<ApiScope> ApiScopes { get; set; }

        public DbSet<CmsComponent> CmsComponents { get; set; }

        public DbSet<PageBase> Pages { get; set; }

        public DbSet<MenuBase> Menus { get; set; }

        public DbSet<SiteSetting> SiteSettings { get; set; }
    }
}
