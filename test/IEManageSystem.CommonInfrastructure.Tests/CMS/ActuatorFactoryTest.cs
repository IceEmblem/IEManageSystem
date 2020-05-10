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
        public void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData)
        {
            componentData.Id = 1;
        }
";

            var actuatorFactory = LocalIocManager.Resolve<IActuatorFactory>();

            actuatorFactory.Register("Test", code);

            var actuator = actuatorFactory.GetActuator("Test");
            ContentComponentData componentData = new ContentComponentData();
            actuator.Exec(componentData, null, null);

            Assert.True(componentData.Id == 1);
        }
    }
}
