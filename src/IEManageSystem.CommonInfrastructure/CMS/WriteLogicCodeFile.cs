using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using System.Linq;
using IEManageSystem.Entitys.Authorization.Users;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    /// <summary>
    /// 该文件用来编写逻辑代码，并没有什么实际的功能
    /// </summary>
    public class WriteLogicCodeFile : IActuator
    {
        public void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
        {
        }
    }
}
