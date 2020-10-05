using IEManageSystem.CMS.DomainModel;
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
            builder.HasIndex(e => e.Name);
            builder.OwnsOne(e => e.Creator).HasData(
                new
                {
                    PageDataId = 1,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 2,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 3,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 4,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 5,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                }
                );
            builder.OwnsOne(e => e.LastUpdater).HasData(
                new
                {
                    PageDataId = 1,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 2,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 3,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 4,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 5,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                }
                );

            builder.HasData(
                new {
                    Id = 1,
                    Name = "Post1",
                    Title = "文章1",
                    Describe = "文章1描述",
                    Content = "文章1的内容",
                    PageName = "Post",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                },
                new {
                    Id = 2,
                    Name = "Post2",
                    Title = "文章2",
                    Describe = "文章2描述",
                    Content = "文章2的内容",
                    PageName = "Post",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                },
                new {
                    Id = 3,
                    Name = "Post3",
                    Title = "文章3",
                    Describe = "文章3描述",
                    Content = "文章3的内容",
                    PageName = "Post",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                },
                new {
                    Id = 4,
                    Name = "Post4",
                    Title = "文章4",
                    Describe = "文章4描述",
                    Content = "文章4的内容",
                    PageName = "Post",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                },
                new {
                    Id = 5,
                    Name = "Post5",
                    Title = "文章5",
                    Describe = "文章5描述",
                    Content = "文章5的内容",
                    PageName = "Post",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                }
            );
        }
    }
}
