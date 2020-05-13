using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace IEManageSystem.Tests.TestDatas
{
    /// <summary>
    /// 允许 PageDataBuilder 前，先允许 PageBuilder
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
            var page = _context.Pages.First(e=>e.Name == "ContentPageName1");

            var pageData = new CMS.DomainModel.PageDatas.PageData()
            {
                Name = "PageData",
                Title = "文章测试标题",
                ContentComponentDatas = new List<ContentComponentData>() {
                    new ContentComponentData(){ 
                        Sign = "ContentPageName1_ComponentSign1",
                        SingleDatas = new List<SingleData>(){ 
                            new SingleData(){ Name = "default" },
                            new SingleData(){ Name = "ContentPageName1_Component1_SingleData2" }
                        }
                    },
                    new ContentComponentData(){ Sign = "ContentPageName1_ComponentSign2" }
                },
                Page = page
            };

            _context.PageDatas.Add(pageData);
        }
    }
}
