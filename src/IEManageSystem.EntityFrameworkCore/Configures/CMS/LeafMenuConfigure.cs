using IEManageSystem.CMS.DomainModel.Menus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class LeafMenuConfigure : IEntityTypeConfiguration<LeafMenu>
    {
        public void Configure(EntityTypeBuilder<LeafMenu> builder)
        {
            builder.HasBaseType<MenuBase>();

            builder.HasData(
                new
                {
                    Id = 2,
                    Name = "Home",
                    DisplayName = "首页",
                    Icon = "oi-home",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu",
                    PageName = "Home"
                },
                new
                {
                    Id = 3,
                    Name = "PostList",
                    DisplayName = "文章列表",
                    Icon = "oi-dial",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu",
                    PageName = "PostList",
                },
                new
                {
                    Id = 4,
                    Name = "Chart",
                    DisplayName = "图标演示",
                    Icon = "oi-document",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu",
                    PageName = "Chart",
                });
        }
    }
}
