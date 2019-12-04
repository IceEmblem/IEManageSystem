using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class StaticPage : PageBase
    {
        protected StaticPage(string name): base(name)
        {
        }

        public StaticPage(string name, PageData pageData) : base(name)
        {
            PageDatas = new List<PageData>() { pageData };
        }
    }
}
