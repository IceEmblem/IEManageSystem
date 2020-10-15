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
using IEManageSystem.CMS.DomainModel.ComponentDatas;

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
            ReloadDB();

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();

            _logicExecAppService.ExecLogic(new IEManageSystem.Services.ManageHome.CMS.Logics.Dto.ExecLogicInput() { 
                LogicName = "ComponentName1",
                PageName = "ContentPage1Name",
                PageDataName = "PageData1Name",
                ContentComponentDataSign = "ContentPage1_Component1Sign",
                Request = ""
            });

            var componentData = dbContext.ContentComponentDatas.Include(e => e.SingleDatas).FirstOrDefault(e => e.Sign == "ContentPage1_Component1Sign");
            Assert.True(componentData.SingleDatas.ElementAt(0).Field1 == "1");
        }

        [Fact]
        public void ExecLogic_ExecNotExsitTest()
        {
            ReloadDB();

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();

            try
            {
                _logicExecAppService.ExecLogic(new IEManageSystem.Services.ManageHome.CMS.Logics.Dto.ExecLogicInput()
                {
                    LogicName = "AAAAAAAAAAAAAAA",
                    PageName = "ContentPage1Name",
                    PageDataName = "PageData",
                    ContentComponentDataSign = "ContentPage1_Component1Sign",
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
