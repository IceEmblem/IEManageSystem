using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class LeafComponentConfigure : IEntityTypeConfiguration<LeafComponent>
    {
        public void Configure(EntityTypeBuilder<LeafComponent> builder)
        {
            builder.HasBaseType<PageComponentBase>();
        }
    }
}
