using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public interface IActuator
    {
        void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, string request);
    }
}
