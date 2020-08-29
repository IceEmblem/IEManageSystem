using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class PageComponentConfigure : IEntityTypeConfiguration<PageComponent>
    {
        public void Configure(EntityTypeBuilder<PageComponent> builder)
        {
            builder.HasIndex(e => e.Sign);
            builder.OwnsOne(e => e.ComponentOSType);
            builder.OwnsOne(e => e.PageComponentBaseSetting);
            builder.OwnsOne(e => e.PageLeafSetting);
            builder.HasOne(e => e.Page).WithMany().IsRequired();
        }
    }
}
