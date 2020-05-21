using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

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
            var page = _context.Pages.First(e=>e.Name == "ContentPage1Name");

            var pageData = new CMS.DomainModel.PageDatas.PageData()
            {
                Name = "PageData1Name",
                Title = "文章测试标题",
                ContentComponentDatas = new List<ContentComponentData>() {
                    new ContentComponentData(){ 
                        Sign = "ContentPage1_Component1Sign",
                        SingleDatas = new List<SingleComponentData>(){ 
                            new SingleComponentData(){ Name = "PageData1_ContentComponentData1_SingleComponentData1Name" },
                            new SingleComponentData(){ Name = "PageData1_ContentComponentData1_SingleComponentData2Name" }
                        }
                    },
                    new ContentComponentData(){ Sign = "ContentPage1_Component2Sign" }
                },
                Page = page
            };

            _context.PageDatas.Add(pageData);
        }
    }
}
