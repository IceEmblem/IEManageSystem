using IEManageSystem.Services.ManageHome.CMS.Pages;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace IEManageSystem.Application.Tests.Services.Pages
{
    public class PageDataQueryAppServiceTest : IEManageSystemTestBase
    {
        private IPageDataQueryAppService _appService { get; }

        public PageDataQueryAppServiceTest()
        {
            _appService = LocalIocManager.Resolve<IPageDataQueryAppService>();

            UsingDbContext(context => new PageBuilder(context).Build());
            UsingDbContext(context => new PageDataBuilder(context).Build());
        }

        [Fact]
        public void GetPageDatas_BaseTest()
        {
            var output = _appService.GetPageDatas(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.GetPageDatasInput()
            {
                PageIndex = 1,
                PageSize = 10,
                EnablePageFilter = false,
            });

            Assert.True(output.PageDatas.Count > 0);
        }

        [Fact]
        public void GetPageData_BaseTest()
        {
            var output = _appService.GetPageData(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.GetPageDataInput()
            {
                PageName = "ContentPage1Name",
                PageDataName = "PageData1Name"
            });

            Assert.True(output.PageData != null);
            Assert.True(output.ContentComponentDatas != null);
            Assert.True(output.ContentComponentDatas.FirstOrDefault(e => e.Sign == "ContentPage1_Component1Sign").SingleDatas.Count > 0);
        }
    }
}
