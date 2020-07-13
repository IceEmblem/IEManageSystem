using IEManageSystem.CMS.DomainModel.ComponentDatas;
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
        private Action<ContentComponentData, PageComponentBase, PageData, PageBase, string
            > _action { get; }

        public Actuator(Action<ContentComponentData, PageComponentBase, PageData, PageBase, string> action) => _action = action;

        public void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, string request)
        {
            _action(componentData, pageComponent, pageData, page, request);
        }
    }
}
