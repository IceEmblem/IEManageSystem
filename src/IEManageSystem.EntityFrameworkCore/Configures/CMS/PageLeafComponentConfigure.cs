using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class PageLeafComponentConfigure : IEntityTypeConfiguration<PageLeafComponent>
    {
        public void Configure(EntityTypeBuilder<PageLeafComponent> builder)
        {
            builder.HasBaseType<PageComponentBase>();
            builder.OwnsOne(e => e.PageLeafSetting);
        }
    }
}
