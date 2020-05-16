using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class MenuComponentConfigure : IEntityTypeConfiguration<MenuComponent>
    {
        public void Configure(EntityTypeBuilder<MenuComponent> builder)
        {
            builder.HasBaseType<PageComponentBase>();
        }
    }
}
