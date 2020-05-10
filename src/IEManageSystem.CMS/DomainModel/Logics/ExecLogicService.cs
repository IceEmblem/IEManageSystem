using System;
using System.Collections.Generic;
using System.Text;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public class ExecLogicService : IExecLogicService
    {
        private IActuatorFactory _actuatorFactory { get; set; }

        public ExecLogicService(IActuatorFactory actuatorFactory) {
            _actuatorFactory = actuatorFactory;
        }

        public void Exec(Logic logic, ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData)
        {
            var actuator = _actuatorFactory.GetActuator(logic.Name);
            if (actuator == null) {
                _actuatorFactory.Register(logic.Name, logic.Code);
                actuator = _actuatorFactory.GetActuator(logic.Name);
            }

            actuator.Exec(componentData, pageComponent, pageData);
        }
    }
}
