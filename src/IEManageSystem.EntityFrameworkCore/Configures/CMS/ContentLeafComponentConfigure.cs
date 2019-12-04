using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class ContentLeafComponentConfigure : IEntityTypeConfiguration<ContentLeafComponent>
    {
        public void Configure(EntityTypeBuilder<ContentLeafComponent> builder)
        {
            builder.HasBaseType<PageComponentBase>();
        }
    }
}
