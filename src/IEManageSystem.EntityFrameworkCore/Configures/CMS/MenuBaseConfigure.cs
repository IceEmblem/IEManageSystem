using IEManageSystem.CMS.DomainModel.Menus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class MenuBaseConfigure : IEntityTypeConfiguration<MenuBase>
    {
        public void Configure(EntityTypeBuilder<MenuBase> builder)
        {
            builder.HasIndex(e => e.Name).IsUnique();
        }
    }
}
