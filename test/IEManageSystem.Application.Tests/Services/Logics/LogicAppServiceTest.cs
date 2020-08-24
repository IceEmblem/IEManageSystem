using Abp.UI;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Services.ManageHome.CMS.Logics;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace IEManageSystem.Application.Tests.Services.Logics
{
    public class LogicAppServiceTest : IEManageSystemTestBase
    {
        private ILogicAppService _logicAppService { get; }

        public LogicAppServiceTest()
        {
            _logicAppService = LocalIocManager.Resolve<ILogicAppService>();
        }

        private void ReloadDB() {
            UsingDbContext(context => context.Database.EnsureDeleted());
            UsingDbContext(context => context.Database.EnsureCreated());
            UsingDbContext(context => new PageBuilder(context).Build());
            UsingDbContext(context => new PageComponentBuilder(context).Build());
            UsingDbContext(context => new PageDataBuilder(context).Build());
            UsingDbContext(context => new LogicBuilder(context).Build());
        }

        [Fact]
        public void Register_BaseTest()
        {
            ReloadDB();

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();

            _logicAppService.RegisterLogic(new IEManageSystem.Services.ManageHome.CMS.Logics.Dto.RegisterLogicInput() { 
                Name = "LogicTest1",
                Code = @"
                    public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
                    {
                        componentData.SingleDatas.ElementAt(0).Field1 = ""1"";
                    }
"
            });

            var logic = dbContext.Logics.FirstOrDefault(e=>e.Name == "LogicTest1");
            Assert.True(logic != null);
        }

        /// <summary>
        /// 注册失败测试
        /// </summary>
        [Fact]
        public void Register_RegisterFailTest() {
            ReloadDB();

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();

            try {
                _logicAppService.RegisterLogic(new IEManageSystem.Services.ManageHome.CMS.Logics.Dto.RegisterLogicInput()
                {
                    Name = "RegisterFailTest",
                    Code = @"
                    public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
                    {
                        componentData.Field1 = ""1"";$$$$$$$$$$$$$$$$$$$$$$$$
                    }
"
                });
            }
            catch (UserFriendlyException) { 
            
            }

            var logic = dbContext.Logics.FirstOrDefault(e => e.Name == "RegisterFailTest");
            Assert.True(logic == null);
        }

        /// <summary>
        /// 重复注册测试
        /// 期望结果：覆盖原理的代码
        /// </summary>
        [Fact]
        public void Register_ReRegisterTest() {
            ReloadDB();

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();

            string code = @"
                    public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
                    {
                        componentData.SingleDatas.ElementAt(0).Field1 = ""100000099"";
                    }
";

            _logicAppService.RegisterLogic(new IEManageSystem.Services.ManageHome.CMS.Logics.Dto.RegisterLogicInput()
            {
                Name = "ComponentName1",
                Code = code
            });

            var logic = dbContext.Logics.FirstOrDefault(e => e.Name == "ComponentName1");
            Assert.Equal(logic.Code, code);
        }
    }
}
