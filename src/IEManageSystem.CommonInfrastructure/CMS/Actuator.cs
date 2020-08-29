using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    public class Actuator : IActuator
    {
        private Action<ContentComponentData, PageComponent, PageData, PageBase, User, string
            > _action { get; }

        public Actuator(Action<ContentComponentData, PageComponent, PageData, PageBase, User, string> action) => _action = action;

        public void Exec(ContentComponentData componentData, PageComponent pageComponent, PageData pageData, PageBase page, User user, string request)
        {
            _action(componentData, pageComponent, pageData, page, user, request);
        }
    }
}
