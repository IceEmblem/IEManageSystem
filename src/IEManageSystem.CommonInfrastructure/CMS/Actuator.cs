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
        private Action<ContentComponentData, PageComponentBase, PageData, string
            > _action { get; }

        public Actuator(Action<ContentComponentData, PageComponentBase, PageData, string> action) => _action = action;

        public void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, string request)
        {
            _action(componentData, pageComponent, pageData, request);
        }
    }
}
