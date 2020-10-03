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
                    Id = 11,
                    Name = "Home",
                    DisplayName = "首页",
                    Icon = "home",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu",
                    PageName = "Home"
                },
                new
                {
                    Id = 12,
                    Name = "PostList",
                    DisplayName = "文章列表",
                    Icon = "",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu",
                    PageName = "PostList",
                },
                new
                {
                    Id = 13,
                    Name = "Chart",
                    DisplayName = "图表演示",
                    Icon = "",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu",
                    PageName = "Chart",
                },
                new
                {
                    Id = 14,
                    Name = "RNHome",
                    DisplayName = "首页",
                    Icon = "home",
                    CompositeMenuId = 2,
                    RootMenuId = 2,
                    Discriminator = "LeafMenu",
                    PageName = "Home"
                },
                new
                {
                    Id = 15,
                    Name = "RNPostList",
                    DisplayName = "文章列表",
                    Icon = "",
                    CompositeMenuId = 2,
                    RootMenuId = 2,
                    Discriminator = "LeafMenu",
                    PageName = "PostList",
                });
        }
    }
}
