using Abp.UI;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class ContentPage : PageBase
    {
        public const  string DiscriminatorName = "ContentPage";

        public ContentPage(string name) : base(name)
        {
            ContentPagePermissionCollection = new ContentPagePermissionCollection();
        }

        public ContentPagePermissionCollection ContentPagePermissionCollection { get; set; }
    }
}
