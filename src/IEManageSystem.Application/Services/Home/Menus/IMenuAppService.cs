using IEManageSystem.Services.Home.Menus.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.Home.Menus
{
    public interface IMenuAppService
    {
        GetMenusOutput GetMenus(GetMenusInput input);
    }
}
