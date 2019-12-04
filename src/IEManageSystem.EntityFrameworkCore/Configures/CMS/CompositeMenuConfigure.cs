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

            builder.HasData(
                new
                {
                    Id = 1,
                    Name = "Home",
                    DisplayName = "首页",
                    Icon = "oi-home",
                    Discriminator = "CompositeMenu"
                },
                new
                {
                    Id = 2,
                    Name = "Game",
                    DisplayName = "游戏",
                    Icon = "oi-dial",
                    Discriminator = "CompositeMenu"
                },
                new
                {
                    Id = 3,
                    Name = "Document",
                    DisplayName = "技术文档",
                    Icon = "oi-document",
                    Discriminator = "CompositeMenu"
                });
        }
    }
}
