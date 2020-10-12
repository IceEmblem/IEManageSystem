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
                },
                new
                {
                    PageDataId = 6,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 7,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 8,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 9,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 10,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 11,
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
                },
                new
                {
                    PageDataId = 6,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 7,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 8,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 9,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 10,
                    EditorId = 1,
                    Name = "超级管理员",
                    HeadSculpture = "",
                    Time = DateTime.Now,
                },
                new
                {
                    PageDataId = 11,
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
                },
                new
                {
                    Id = 6,
                    Name = "Video1",
                    Title = "视频1",
                    Describe = "视频1的描述",
                    Content = "",
                    PageName = "Video",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                    Field1 = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                    Field2 = "https://img-blog.csdnimg.cn/20190301125102646.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTAxMDE5OA==,size_16,color_FFFFFF,t_70"
                },
                new
                {
                    Id = 7,
                    Name = "Video2",
                    Title = "视频2",
                    Describe = "视频2的描述",
                    Content = "",
                    PageName = "Video",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                    Field1 = "http://vjs.zencdn.net/v/oceans.mp4",
                    Field2 = "https://img-blog.csdnimg.cn/20190301125255914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTAxMDE5OA==,size_16,color_FFFFFF,t_70"
                },
                new
                {
                    Id = 8,
                    Name = "Video3",
                    Title = "视频3",
                    Describe = "视频3的描述",
                    Content = "",
                    PageName = "Video",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                    Field1 = "https://media.w3.org/2010/05/sintel/trailer.mp4",
                    Field2 = "https://img-blog.csdnimg.cn/20190301125528758.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTAxMDE5OA==,size_16,color_FFFFFF,t_70"
                },
                new
                {
                    Id = 9,
                    Name = "Music1",
                    Title = "音乐1",
                    Describe = "音乐1的描述",
                    Content = "",
                    PageName = "Music",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                    Field1 = "http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_93477122&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3",
                },
                new
                {
                    Id = 10,
                    Name = "Music2",
                    Title = "音乐2",
                    Describe = "音乐2的描述",
                    Content = "",
                    PageName = "Music",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                    Field1 = "http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_90991360&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3",
                },
                new
                {
                    Id = 11,
                    Name = "Music3",
                    Title = "音乐3",
                    Describe = "音乐3的描述",
                    Content = "",
                    PageName = "Music",
                    Score = (double)0,
                    ScoreNum = 0,
                    Click = 0,
                    Field1 = "http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_96145895&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3",
                }
            );
        }
    }
}
