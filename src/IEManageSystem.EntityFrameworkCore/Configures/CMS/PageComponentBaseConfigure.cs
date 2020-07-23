using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class PageComponentBaseConfigure : IEntityTypeConfiguration<PageComponentBase>
    {
        public void Configure(EntityTypeBuilder<PageComponentBase> builder)
        {
            builder.HasIndex(e => e.Sign);
            builder.OwnsOne(e => e.PageComponentBaseSetting);
            builder.HasOne(e => e.Page).WithMany().IsRequired();
        }
    }
}
