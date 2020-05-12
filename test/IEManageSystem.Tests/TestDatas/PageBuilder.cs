using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Tests.TestDatas
{
    public class PageBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public PageBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var contentPage = new ContentPage("ContentPageName1")
            {
                DisplayName = "测试内容页",
                Description = "用于测试的数据",
                PageComponents = new List<PageComponentBase>() {
                    new LeafComponent("ComponentName1"){
                        Sign = "ContentPageName1_ComponentSign1",
                        PageComponentBaseSetting = new PageComponentBaseSetting(1, "12", "27rem", null, null, null, null),
                        PageComponentSettings = new List<PageComponentSetting>(){
                            new PageComponentSetting(){ Name = "PicSetting" }
                        }
                    },
                    new CompositeComponent("ComponentName2"){ 
                        Sign = "ContentPageName1_ComponentSign2"
                    },
                    new PageLeafComponent("ComponentName3"){ 
                        Sign = "ContentPageName1_ComponentSign3"
                    }
                }
            };

            _context.Pages.Add(contentPage);

            var pageData = new CMS.DomainModel.PageDatas.PageData()
            {
                Name = "StaticPage_PageData",
                Title = "文章测试标题",
                ContentComponentDatas = new List<ContentComponentData>() {
                    new ContentComponentData(){ Sign = "StaticPage_ComponentSign1" },
                    new ContentComponentData(){ Sign = "StaticPage_ComponentSign2" }
                }
            };

            var staticPage = new StaticPage("StaticPageName", pageData)
            {
                DisplayName = "测试内容页",
                Description = "用于测试的数据",
                PageComponents = new List<PageComponentBase>() {
                    new LeafComponent("ComponentName1"){
                        Sign = "StaticPage_ComponentSign1",
                    },
                    new LeafComponent("ComponentName1"){
                        Sign = "StaticPage_ComponentSign2",
                    }
                }
            };

            _context.Pages.Add(staticPage);
        }
    }
}
