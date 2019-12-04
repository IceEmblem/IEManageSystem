using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class PageDataConfigure : IEntityTypeConfiguration<PageData>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<PageData> builder)
        {
            builder.HasData(new
            {
                Id = 1,
                Name = "Index",
                Title = "首页",
                PageId = 1
            });
        }
    }
}
