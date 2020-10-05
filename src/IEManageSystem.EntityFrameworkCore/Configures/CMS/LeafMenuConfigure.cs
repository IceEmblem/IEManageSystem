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
                    Icon = "",
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
                    Name = "Tencent",
                    DisplayName = "腾讯官网",
                    Icon = "",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu",
                    PageName = "Tencent",
                },
                new
                {
                    Id = 15,
                    Name = "WBolt",
                    DisplayName = "WBolt官网",
                    Icon = "",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu",
                    PageName = "WBolt",
                },
                new
                {
                    Id = 20,
                    Name = "RNHome",
                    DisplayName = "推荐",
                    Icon = "",
                    CompositeMenuId = 2,
                    RootMenuId = 2,
                    Discriminator = "LeafMenu",
                    PageName = "Home"
                },
                new
                {
                    Id = 21,
                    Name = "RNPostList",
                    DisplayName = "文章",
                    Icon = "",
                    CompositeMenuId = 2,
                    RootMenuId = 2,
                    Discriminator = "LeafMenu",
                    PageName = "",
                },
                new
                {
                    Id = 22,
                    Name = "RNChart",
                    DisplayName = "图表",
                    Icon = "",
                    CompositeMenuId = 2,
                    RootMenuId = 2,
                    Discriminator = "LeafMenu",
                    PageName = "",
                },
                new
                {
                    Id = 23,
                    Name = "RNMenu4",
                    DisplayName = "关注",
                    Icon = "",
                    CompositeMenuId = 2,
                    RootMenuId = 2,
                    Discriminator = "LeafMenu",
                    PageName = "",
                },
                new
                {
                    Id = 24,
                    Name = "RNMenu5",
                    DisplayName = "视频",
                    Icon = "",
                    CompositeMenuId = 2,
                    RootMenuId = 2,
                    Discriminator = "LeafMenu",
                    PageName = "",
                });
        }
    }
}
