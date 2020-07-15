using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class MenuBase:Entity
    {
        public MenuBase(string name, string displayName)
        {
            Name = name;

            DisplayName = displayName;
        }

        [Required]
        public string Name { get; set; }

        [Required]
        public string DisplayName { get; set; }

        public string Icon { get; set; }

        public int? CompositeMenuId { get; set; }

        public int? RootMenuId { get; set; }

        [ForeignKey("RootMenuId")]
        public CompositeMenu RootMenu { get; set; }

        public string PageName { get; set; }

        public string PageDataName { get; set; }

        public void SetRootMenu(CompositeMenu rootMenu) 
        {
            RootMenu = rootMenu;

            if (!(this is CompositeMenu)) {
                return;
            }

            foreach (var childMenu in ((CompositeMenu)this).Menus) 
            {
                childMenu.SetRootMenu(rootMenu);
            }
        }
    }
}
