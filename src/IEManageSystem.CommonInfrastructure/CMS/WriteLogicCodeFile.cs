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
using Abp.UI;
using Abp.Authorization;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    /// <summary>
    /// 该文件用来编写逻辑代码，并没有什么实际的功能
    /// </summary>
    public class WriteLogicCodeFile : BaseActuator
    {
        private static string _commentName { get; } = "commentData";

        public override void Exec(ContentComponentData componentData, PageData pageData, Page page, User user, string request)
        {
        }
    }
}
