using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class ContentPagePeimissionCollectionConfigure : IEntityTypeConfiguration<ContentPagePeimissionCollection>
    {
        public void Configure(EntityTypeBuilder<ContentPagePeimissionCollection> builder)
        {
            builder.HasMany(e => e.ManagePermissions).WithOne().IsRequired();
            builder.HasMany(e => e.QueryPermissions).WithOne().IsRequired();
        }
    }
}
