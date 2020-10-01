using Abp.EntityFrameworkCore;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.CMS.DomainModel;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.Menus;
using IEManageSystem.CMS.DomainModel.PageDatas;
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
            modelBuilder.ApplyConfiguration(new RoleConfigure());
            modelBuilder.ApplyConfiguration(new PermissionConfigure());

            // 配置CMS
            modelBuilder.ApplyConfiguration(new ContentPagePeimissionCollectionConfigure());

            modelBuilder.ApplyConfiguration(new PageDataConfigure());

            modelBuilder.ApplyConfiguration(new MenuBaseConfigure());
            modelBuilder.ApplyConfiguration(new LeafMenuConfigure());
            modelBuilder.ApplyConfiguration(new CompositeMenuConfigure());

            modelBuilder.ApplyConfiguration(new ComponentDataConfigure());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Permission> Permissions { get; set; }

        public DbSet<ApiScope> ApiScopes { get; set; }

        public DbSet<CmsComponent> CmsComponents { get; set; }

        public DbSet<ContentPagePermissionCollection> ContentPagePermissionCollections { get; set; }

        public DbSet<MenuBase> Menus { get; set; }

        public DbSet<PageData> PageDatas { get; set; }

        public DbSet<ContentComponentData> ContentComponentDatas { get; set; }

        public DbSet<SiteSetting> SiteSettings { get; set; }

        public DbSet<Logic> Logics { get; set; }
    }
}
