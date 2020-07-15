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
                    Id = 101,
                    Name = "PCGame",
                    DisplayName = "主机游戏",
                    CompositeMenuId = 3,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu"
                },
                new
                {
                    Id = 102,
                    Name = "PhoneGame",
                    DisplayName = "手机游戏",
                    CompositeMenuId = 3,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu"
                },
                new
                {
                    Id = 103,
                    Name = "Web",
                    DisplayName = "站点技术",
                    CompositeMenuId = 4,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu"
                },
                new
                {
                    Id = 104,
                    Name = "Desktop",
                    DisplayName = "桌面开发",
                    CompositeMenuId = 4,
                    RootMenuId = 1,
                    Discriminator = "LeafMenu"
                });
        }
    }
}
