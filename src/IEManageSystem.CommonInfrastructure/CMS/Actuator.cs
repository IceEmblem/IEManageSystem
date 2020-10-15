using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Logics;
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
        private Action<ContentComponentData, PageData, Page, User, string
            > _action { get; }

        public Actuator(Action<ContentComponentData, PageData, Page, User, string> action) => _action = action;

        public void Exec(ContentComponentData componentData, PageData pageData, Page page, User user, string request)
        {
            _action(componentData, pageData, page, user, request);
        }
    }
}
