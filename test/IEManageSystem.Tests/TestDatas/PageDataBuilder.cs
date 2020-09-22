using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using IEManageSystem.CMS.DomainModel.ComponentDatas;

namespace IEManageSystem.Tests.TestDatas
{
    /// <summary>
    /// 使用 PageDataBuilder 前，先使用 PageBuilder
    /// </summary>
    public class PageDataBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public PageDataBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var user = _context.Users.FirstOrDefault(e => e.Name == "User1");
            var page = _context.Pages.First(e=>e.Name == "ContentPage1Name");

            var pageData = new CMS.DomainModel.PageDatas.PageData()
            {
                Name = "PageData1Name",
                Title = "文章测试标题",
                Page = page,
                Creator = new CMS.DomainModel.EntityEdit(user.Id, user.Name, user.HeadSculpture),
                LastUpdater = new CMS.DomainModel.EntityEdit(user.Id, user.Name, user.HeadSculpture),
            };

            _context.PageDatas.Add(pageData);

            _context.ComponentDatas.AddRange(new List<ContentComponentData>() {
                    new ContentComponentData(){
                        Sign = "ContentPage1_Component1Sign",
                        SingleDatas = new List<SingleComponentData>(){
                            new SingleComponentData(){ Name = "PageData1_ContentComponentData1_SingleComponentData1Name" },
                            new SingleComponentData(){ Name = "PageData1_ContentComponentData1_SingleComponentData2Name" }
                        },
                        PageData = pageData,
                    },
                    new ContentComponentData(){ Sign = "ContentPage1_Component2Sign", PageData = pageData },
                });
        }
    }
}
