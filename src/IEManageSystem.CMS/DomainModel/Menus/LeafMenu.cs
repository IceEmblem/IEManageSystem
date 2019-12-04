using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class LeafMenu : MenuBase
    {
        public LeafMenu(string name, string displayName = null) : base(name, displayName ?? name)
        {
        }
    }
}
