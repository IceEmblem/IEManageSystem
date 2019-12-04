using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Menus.Dto
{
    public class AddCompositeMenuInput
    {
        public int? ParentMenuId { get; set; }

        [Required]
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Icon { get; set; }

        public string PageName { get; set; }

        public string PageDataName { get; set; }
    }
}
