using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    public class Actuator : IActuator
    {
        private Action<ContentComponentData, PageComponentBase, PageData> _action { get; }

        public Actuator(Action<ContentComponentData, PageComponentBase, PageData> action) => _action = action;

        public void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData)
        {
            _action(componentData, pageComponent, pageData);
        }
    }
}
