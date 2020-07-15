using IEManageSystem.Services.ManageHome.CMS.Menus.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Menus
{
    public interface IMenuAppService
    {
        GetMenusOutput GetMenus(GetMenusInput input);

        GetMenuOutput GetMenu(GetMenuInput input);
    }
}
