using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Tests.TestDatas
{
    /// <summary>
    /// 运行该生成请先运行 PageBuilder
    /// </summary>
    public class PageComponentBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public PageComponentBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var contentPage1 = _context.Pages.FirstOrDefault(e=>e.Name == "ContentPage1Name");
            _context.PageComponents.AddRange(new List<PageComponentBase>() {
                    new LeafComponent("ComponentName1"){
                        Sign = "ContentPage1_Component1Sign",
                        PageComponentBaseSetting = new PageComponentBaseSetting(1, "12", "27rem", null, null, null, null, null),
                        ComponentOSType = ComponentOSType.WebComponent,
                        PageComponentSettings = new List<PageComponentSetting>(){
                            new PageComponentSetting(){
                                Name = "ContentPage1_Component1_PageComponentSetting1Name",
                                SingleDatas = new List<SingleSettingData>(){
                                    new SingleSettingData(){ Name = "ContentPage1_Component1_PageComponentSetting1_SingleSettingData1Name" },
                                    new SingleSettingData(){ Name = "ContentPage1_Component1_PageComponentSetting1_SingleSettingData2Name" }
                                }
                            }
                        },
                        Page = contentPage1
                    },
                    new CompositeComponent("ComponentName2"){
                        Sign = "ContentPage1_Component2Sign",
                        Page = contentPage1,
                        ComponentOSType = ComponentOSType.WebComponent,
                    },
                    new PageLeafComponent("ComponentName3"){
                        Sign = "ContentPage1_Component3Sign",
                        Page = contentPage1,
                        ComponentOSType = ComponentOSType.WebComponent,
                    }
                });


            var staticPage = _context.Pages.FirstOrDefault(e => e.Name == "StaticPageName");
            _context.PageComponents.AddRange(new List<PageComponentBase>() {
                    new LeafComponent("ComponentName1"){
                        Sign = "StaticPage1_PageComponentBase1Sign",
                        Page = staticPage,
                        ComponentOSType = ComponentOSType.WebComponent,
                    },
                    new LeafComponent("ComponentName1"){
                        Sign = "StaticPage1_PageComponentBase2Sign",
                        Page = staticPage,
                        ComponentOSType = ComponentOSType.WebComponent,
                    }
                });
        }
    }
}
