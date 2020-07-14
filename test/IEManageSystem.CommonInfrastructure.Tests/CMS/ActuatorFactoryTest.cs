using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CommonInfrastructure.CMS;
using IEManageSystem.Tests;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace IEManageSystem.CommonInfrastructure.Tests.CMS
{
    public class ActuatorFactoryTest : IEManageSystemTestBase
    {
        [Fact]
        public void Register_BaseTest() {
            string code = @"
        public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
        {
            componentData.Id = 1;
        }
";

            var actuatorFactory = LocalIocManager.Resolve<IActuatorFactory>();

            actuatorFactory.Register("Test", code);

            var actuator = actuatorFactory.GetActuator("Test");
            ContentComponentData componentData = new ContentComponentData();
            actuator.Exec(componentData, null, null, null, null, null);

            Assert.True(componentData.Id == 1);
        }

        [Fact]
        public void Register_RegisterFailTest()
        {
            var actuatorFactory = LocalIocManager.Resolve<IActuatorFactory>();

            actuatorFactory.Register("RegisterFailTest1", @"
        public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
        {
            componentData.Id = 1;
        }
");

            try
            {
                actuatorFactory.Register("RegisterFailTest2", @"
        public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
        {
            componentData.Id = 1;$$$$$$$
        }
");
            }
            catch (Exception) { 
            
            }

            var actuator = actuatorFactory.GetActuator("RegisterFailTest2");
            Assert.True(actuator == null);

            // 注册失败不能影响前面的注册结果
            actuator = actuatorFactory.GetActuator("RegisterFailTest1");
            Assert.True(actuator != null);
        }

        /// <summary>
        /// 多次注册
        /// </summary>
        [Fact]
        public void Register_ManyRegisterTest()
        {
            var actuatorFactory = LocalIocManager.Resolve<IActuatorFactory>();

            actuatorFactory.Register("Test1", @"
        public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
        {
            componentData.Id = 1;
        }
");

            var actuator = actuatorFactory.GetActuator("Test1");
            ContentComponentData componentData = new ContentComponentData();
            actuator.Exec(componentData, null, null, null, null, null);
            Assert.True(componentData.Id == 1);

            actuatorFactory.Register("Test2", @"
        public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
        {
            componentData.Id = 2;
        }
");

            actuatorFactory.Register("Test3", @"
        public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
        {
            componentData.Id = 3;
        }
");

            actuator = actuatorFactory.GetActuator("Test1");
            componentData = new ContentComponentData();
            actuator.Exec(componentData, null, null, null, null, null);
            Assert.True(componentData.Id == 1);

            actuator = actuatorFactory.GetActuator("Test2");
            componentData = new ContentComponentData();
            actuator.Exec(componentData, null, null, null, null, null);
            Assert.True(componentData.Id == 2);

            actuator = actuatorFactory.GetActuator("Test3");
            componentData = new ContentComponentData();
            actuator.Exec(componentData, null, null, null, null, null);
            Assert.True(componentData.Id == 3);
        }
    }
}
