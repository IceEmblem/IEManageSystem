using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class MenuComponent : PageComponentBase
    {
        public MenuComponent(string name) : base(name)
        {
        }

        public string MenuName { get; set; }
    }
}
