using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Menus.Dto
{
    public class UpdateMenuInput
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Icon { get; set; }

        public string PageName { get; set; }

        public string PageDataName { get; set; }
    }
}
