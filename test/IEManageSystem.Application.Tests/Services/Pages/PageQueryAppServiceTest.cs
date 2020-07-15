using IEManageSystem.Services.ManageHome.CMS.Pages;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using System.Linq;

namespace IEManageSystem.Application.Tests.Services.Pages
{
    public class PageQueryAppServiceTest : IEManageSystemTestBase
    {
        private IPageQueryAppService _appService { get; }

        public PageQueryAppServiceTest()
        {
            _appService = LocalIocManager.Resolve<IPageQueryAppService>();

            UsingDbContext(context => new PageBuilder(context).Build());
            UsingDbContext(context => new PageDataBuilder(context).Build());
        }

        [Fact]
        public void GetPages_BaseTest() 
        {
            var output = _appService.GetPages(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.GetPagesInput() {
                PageIndex = 1,
                PageSize = 10,
            });

            Assert.True(output.Pages.FirstOrDefault(e=>e.Name == "ContentPage1Name") != null);
        }

        [Fact]
        public void GetPage_BaseTest() 
        {
            var output = _appService.GetPage(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.GetPageInput() { 
                Name = "ContentPage1Name"
            });

            Assert.True(output.Page != null);
            Assert.True(output.Page.PageComponents != null);
            Assert.True(output.Page.PageComponents.FirstOrDefault(e=>e.Name == "ComponentName1").PageComponentBaseSetting != null);
            Assert.True(output.Page.PageComponents.FirstOrDefault(e => e.Name == "ComponentName1").PageComponentSettings != null);
            Assert.True(output.Page.PageComponents.FirstOrDefault(e => e.Name == "ComponentName1").PageComponentSettings[0].SingleDatas.Count > 0);

            Assert.True(output.DefaultComponentDatas.Count > 0);
            Assert.True(output.DefaultComponentDatas[0].SingleDatas.Count > 0);
        }
    }
}
