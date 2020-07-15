using IEManageSystem.CMS.DomainModel.ComponentDatas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class DefaultComponentDataConfigure : IEntityTypeConfiguration<DefaultComponentData>
    {
        public void Configure(EntityTypeBuilder<DefaultComponentData> builder)
        {
            builder.HasBaseType<ComponentData>();
        }
    }
}
