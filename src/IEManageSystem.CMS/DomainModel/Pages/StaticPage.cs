using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class StaticPage : PageBase
    {
        public const string DiscriminatorName = "StaticPage";

        public StaticPage(string name): base(name)
        {
        }
    }
}
