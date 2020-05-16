using IEManageSystem.CMS.DomainModel.Menus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class CompositeMenuConfigure : IEntityTypeConfiguration<CompositeMenu>
    {
        public void Configure(EntityTypeBuilder<CompositeMenu> builder)
        {
            builder.HasBaseType<MenuBase>();

            builder.HasMany(e => e.Menus).WithOne().HasForeignKey(e=>e.CompositeMenuId);

            builder.HasData(
                new {
                    Id = 1,
                    Name = "Main",
                    DisplayName = "主菜单",
                    Icon = "",
                    Discriminator = "CompositeMenu"
                },
                new
                {
                    Id = 2,
                    Name = "Home",
                    DisplayName = "首页",
                    Icon = "oi-home",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "CompositeMenu"
                },
                new
                {
                    Id = 3,
                    Name = "Game",
                    DisplayName = "游戏",
                    Icon = "oi-dial",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "CompositeMenu"
                },
                new
                {
                    Id = 4,
                    Name = "Document",
                    DisplayName = "技术文档",
                    Icon = "oi-document",
                    CompositeMenuId = 1,
                    RootMenuId = 1,
                    Discriminator = "CompositeMenu"
                });
        }
    }
}
