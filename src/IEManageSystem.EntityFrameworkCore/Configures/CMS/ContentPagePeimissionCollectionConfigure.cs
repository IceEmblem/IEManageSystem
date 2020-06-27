using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class ContentPagePeimissionCollectionConfigure : IEntityTypeConfiguration<ContentPagePermissionCollection>
    {
        public void Configure(EntityTypeBuilder<ContentPagePermissionCollection> builder)
        {
            builder.HasMany(e => e.ManagePermissions).WithOne();
            builder.HasMany(e => e.QueryPermissions).WithOne();
        }
    }
}
