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
                });
        }
    }
}
