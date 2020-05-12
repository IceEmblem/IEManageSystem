using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Services.ManageHome.CMS.Logics;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.UI;

namespace IEManageSystem.Application.Tests.Services.Logics
{
    public class LogicExecAppServiceTest : IEManageSystemTestBase
    {
        private ILogicExecAppService _logicExecAppService { get; }

        public LogicExecAppServiceTest() {
            _logicExecAppService = LocalIocManager.Resolve<ILogicExecAppService>();
        }

        [Fact]
        public void ExecLogic_BaseTest() {
            UsingDbContext(context => new PageBuilder(context).Build());
            UsingDbContext(context => new PageDataBuilder(context).Build());
            UsingDbContext(context => new LogicBuilder(context).Build());

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();

            _logicExecAppService.ExecLogic(new IEManageSystem.Services.ManageHome.CMS.Logics.Dto.ExecLogicInput() { 
                LogicName = "ComponentName1",
                PageName = "ContentPageName1",
                PageComponentSign = "ContentPageName1_ComponentSign1",
                PageDataName = "PageData",
                ContentComponentDataSign = "ContentPageName1_ComponentSign1",
                Request = ""
            });

            var pageData = dbContext.PageDatas.Include(e=>e.ContentComponentDatas).FirstOrDefault(e=>e.Name == "PageData");
            var componentData = pageData.GetComponentDataForSign("ContentPageName1_ComponentSign1");
            Assert.True(componentData.Field1 == "1");
        }

        [Fact]
        public void ExecLogic_ExecNotExsitTest()
        {
            UsingDbContext(context => new PageBuilder(context).Build());
            UsingDbContext(context => new PageDataBuilder(context).Build());
            UsingDbContext(context => new LogicBuilder(context).Build());

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();

            try
            {
                _logicExecAppService.ExecLogic(new IEManageSystem.Services.ManageHome.CMS.Logics.Dto.ExecLogicInput()
                {
                    LogicName = "AAAAAAAAAAAAAAA",
                    PageName = "ContentPageName1",
                    PageComponentSign = "ContentPageName1_ComponentSign1",
                    PageDataName = "PageData",
                    ContentComponentDataSign = "ContentPageName1_ComponentSign1",
                    Request = ""
                });
            }
            catch (UserFriendlyException)
            {
                Assert.True(true);
            }
            catch (Exception) 
            {
                Assert.True(false);
            }
        }
    }
}
