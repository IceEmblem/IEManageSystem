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
    }
}
