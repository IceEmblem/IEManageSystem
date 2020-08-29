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
using IEManageSystem.CMS.DomainModel.PageComponents;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    /// <summary>
    /// 该文件用来编写逻辑代码，并没有什么实际的功能
    /// </summary>
    public class WriteLogicCodeFile : BaseActuator
    {
        private static string _commentName { get; } = "commentData";

        public override void Exec(ContentComponentData componentData, PageComponent pageComponent, PageData pageData, PageBase page, User user, string request)
        {
            if (user == null) {
                throw new AbpAuthorizationException("未登录，请先登录");
            }

            if (pageData == null) {
                throw new UserFriendlyException("组件只能在文章页面被调用");
            }

            var curComponentData = componentData;
            if (curComponentData == null) {
                curComponentData = CreateContentComponentData(pageComponent.Sign, pageData);
            }

            if (curComponentData.GetSingleDatas(_commentName).Count() > 1000) {
                throw new UserFriendlyException("评论已达到上限，无法再评论");
            }

            if (request.Length > 1000) {
                throw new UserFriendlyException("评论过长");
            }

            if (request.Length < 10)
            {
                throw new UserFriendlyException("评论过短");
            }

            var commentData = curComponentData.CreateSingleData(_commentName);
            commentData.Field1 = user.Id.ToString();
            commentData.Field2 = user.Name;
            commentData.Field3 = user.HeadSculpture;
            commentData.Field4 = request;
            DateTime now = DateTime.Now;
            commentData.Field5 = $"{now.Year}-{now.Month}-{now.Day} {now.Hour}:{now.Minute}";
        }
    }
}
