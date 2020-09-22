using IEManageSystem.CMS.DomainModel.ComponentDatas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class ComponentDataConfigure : IEntityTypeConfiguration<ComponentData>
    {
        public void Configure(EntityTypeBuilder<ComponentData> builder)
        {
            builder.HasIndex(e => e.Sign);
            builder.HasDiscriminator(e => e.Discriminator).HasValue<DefaultComponentData>("DefaultComponentData").HasValue<ContentComponentData>("ContentComponentData");
        }
    }
}
