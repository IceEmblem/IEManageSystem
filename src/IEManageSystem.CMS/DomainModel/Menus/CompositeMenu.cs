using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class CompositeMenu : MenuBase
    {
        public CompositeMenu(string name, string displayName = null) : base(name, displayName ?? name)
        {
        }

        public ICollection<MenuBase> Menus { get; set; }
    }
}
