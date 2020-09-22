using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class StaticPageConfigure : IEntityTypeConfiguration<StaticPage>
    {
        public void Configure(EntityTypeBuilder<StaticPage> builder)
        {
            builder.HasData(new
            {
                Id = 1,
                Name = "Home",
                DisplayName = "首页",
                Description = "这是一个首页",
                Discriminator = StaticPage.DiscriminatorName
            });
        }
    }
}
