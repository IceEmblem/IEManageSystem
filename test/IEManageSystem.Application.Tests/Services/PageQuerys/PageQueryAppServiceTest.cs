using IEManageSystem.Services.ManageHome.CMS.PageQuerys;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using System.Linq;

namespace IEManageSystem.Application.Tests.Services.PageQuerys
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
            var output = _appService.GetPages(new IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto.GetPagesInput() {
                PageIndex = 1,
                PageSize = 10,
            });

            Assert.True(output.Pages.FirstOrDefault(e=>e.Name == "ContentPageName1") != null);
        }

        [Fact]
        public void GetPage_BaseTest() 
        {
            var output = _appService.GetPage(new IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto.GetPageInput() { 
                Name = "ContentPageName1"
            });

            Assert.True(output.Page != null);
            Assert.True(output.Page.PageComponents != null);
            Assert.True(output.Page.PageComponents.FirstOrDefault(e=>e.Name == "ComponentName1").PageComponentBaseSetting != null);
            Assert.True(output.Page.PageComponents.FirstOrDefault(e => e.Name == "ComponentName1").PageComponentSettings != null);
        }

        [Fact]
        public void GetPageDatas_BaseTest() {
            var output = _appService.GetPageDatas(new IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto.GetPageDatasInput() { 
                PageIndex = 1,
                PageSize = 10,
                PageName = "ContentPageName1"
            });

            Assert.True(output.PageDatas.Count > 0);
        }

        [Fact]
        public void GetPageData_BaseTest() {
            var output = _appService.GetPageData(new IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto.GetPageDataInput() { 
                PageName = "ContentPageName1",
                PageDataName = "PageData"
            });

            Assert.True(output.PageData != null);
            Assert.True(output.PageData.ContentComponentDatas != null);
            Assert.True(output.PageData.ContentComponentDatas.FirstOrDefault(e=>e.Sign == "ContentPageName1_ComponentSign1").SingleDatas.Count > 0);
        }
    }
}
