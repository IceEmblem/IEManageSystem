using Abp.UI;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class ContentPage : PageBase
    {
        public ContentPage(string name) : base(name)
        {
        }

        public ContentPagePeimissionCollection ContentPagePeimissionCollection { get; set; }
    }
}
