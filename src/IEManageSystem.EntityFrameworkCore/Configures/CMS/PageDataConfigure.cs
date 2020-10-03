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
            builder.OwnsOne(e => e.Creator);
            builder.OwnsOne(e => e.LastUpdater);

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
                    Creator_EditorId = 1,
                    Creator_Name = "超级管理员",
                    Creator_HeadSculpture = "",
                    Creator_Time = DateTime.Now,
                    LastUpdater_EditorId = 1,
                    LastUpdater_Name = "超级管理员",
                    LastUpdater_HeadSculpture = "",
                    LastUpdater_Time = DateTime.Now,
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
                    Creator_EditorId = 1,
                    Creator_Name = "超级管理员",
                    Creator_HeadSculpture = "",
                    Creator_Time = DateTime.Now,
                    LastUpdater_EditorId = 1,
                    LastUpdater_Name = "超级管理员",
                    LastUpdater_HeadSculpture = "",
                    LastUpdater_Time = DateTime.Now,
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
                    Creator_EditorId = 1,
                    Creator_Name = "超级管理员",
                    Creator_HeadSculpture = "",
                    Creator_Time = DateTime.Now,
                    LastUpdater_EditorId = 1,
                    LastUpdater_Name = "超级管理员",
                    LastUpdater_HeadSculpture = "",
                    LastUpdater_Time = DateTime.Now,
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
                    Creator_EditorId = 1,
                    Creator_Name = "超级管理员",
                    Creator_HeadSculpture = "",
                    Creator_Time = DateTime.Now,
                    LastUpdater_EditorId = 1,
                    LastUpdater_Name = "超级管理员",
                    LastUpdater_HeadSculpture = "",
                    LastUpdater_Time = DateTime.Now,
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
                    Creator_EditorId = 1,
                    Creator_Name = "超级管理员",
                    Creator_HeadSculpture = "",
                    Creator_Time = DateTime.Now,
                    LastUpdater_EditorId = 1,
                    LastUpdater_Name = "超级管理员",
                    LastUpdater_HeadSculpture = "",
                    LastUpdater_Time = DateTime.Now,
                }
            );
        }
    }
}
