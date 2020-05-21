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
            var contentPage = new ContentPage("ContentPage1Name")
            {
                DisplayName = "测试内容页",
                Description = "用于测试的数据",
                PageComponents = new List<PageComponentBase>() {
                    new LeafComponent("ComponentName1"){
                        Sign = "ContentPage1_Component1Sign",
                        PageComponentBaseSetting = new PageComponentBaseSetting(1, "12", "27rem", null, null, null, null),
                        PageComponentSettings = new List<PageComponentSetting>(){
                            new PageComponentSetting(){
                                Name = "ContentPage1_Component1_PageComponentSetting1Name",
                                SingleDatas = new List<SingleSettingData>(){
                                    new SingleSettingData(){ Name = "ContentPage1_Component1_PageComponentSetting1_SingleSettingData1Name" },
                                    new SingleSettingData(){ Name = "ContentPage1_Component1_PageComponentSetting1_SingleSettingData2Name" }
                                }
                            }
                        }
                    },
                    new CompositeComponent("ComponentName2"){ 
                        Sign = "ContentPage1_Component2Sign"
                    },
                    new PageLeafComponent("ComponentName3"){ 
                        Sign = "ContentPage1_Component3Sign"
                    }
                }
            };

            _context.Pages.Add(contentPage);

            var pageData = new CMS.DomainModel.PageDatas.PageData()
            {
                Name = "StaticPage1_PageData1Name",
                Title = "文章测试标题",
                ContentComponentDatas = new List<ContentComponentData>() {
                    new ContentComponentData(){ Sign = "StaticPage1_PageComponentBase1Sign" },
                    new ContentComponentData(){ Sign = "StaticPage1_PageComponentBase2Sign" }
                }
            };

            var staticPage = new StaticPage("StaticPageName", pageData)
            {
                DisplayName = "测试内容页",
                Description = "用于测试的数据",
                PageComponents = new List<PageComponentBase>() {
                    new LeafComponent("ComponentName1"){
                        Sign = "StaticPage1_PageComponentBase1Sign",
                    },
                    new LeafComponent("ComponentName1"){
                        Sign = "StaticPage1_PageComponentBase2Sign",
                    }
                }
            };

            _context.Pages.Add(staticPage);
        }
    }
}
