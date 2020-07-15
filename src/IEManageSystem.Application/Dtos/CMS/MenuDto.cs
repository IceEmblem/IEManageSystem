using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    public class MenuDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Icon { get; set; }

        public string PageName { get; set; }

        public string PageDataName { get; set; }

        /// <summary>
        /// CompositeMenu为“CompositeMenu”，LeafMenu为“LeafMenu”
        /// </summary>
        public string MenuType { get; set; }

        public List<MenuDto> Menus { get; set; }

        public void SetCompositeMenuType() {
            MenuType = "CompositeMenu";
        }

        public bool IsCompositeMenu() => MenuType == "CompositeMenu";

        public void SetLeafMenuType() {
            MenuType = "LeafMenu";
        }

        public bool IsLeafMenu() => MenuType == "LeafMenu";
    }
}
