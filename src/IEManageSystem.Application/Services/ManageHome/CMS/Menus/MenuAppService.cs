using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Abp.Domain.Repositories;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.Menus;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Repositorys;
using IEManageSystem.Services.ManageHome.CMS.Menus.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Menus
{
    public class MenuAppService : IEManageSystemAppServiceBase, IMenuAppService
    {
        private IEfRepository<MenuBase, int> _menuRepository;

        private MenuManager _menuManager { get; set; }

        public MenuAppService(
            IEfRepository<MenuBase, int> menuRepository,
            MenuManager menuManager)
        {
            _menuRepository = menuRepository;

            _menuManager = menuManager;
        }

        // 获取根菜单列表
        public GetMenusOutput GetMenus(GetMenusInput input)
        {
            List<MenuBase> rootMenus = _menuRepository.GetAllList(e => e.CompositeMenuId == null);

            List<MenuDto> results = new List<MenuDto>();

            foreach (MenuBase menu in rootMenus)
            {
                results.Add(CreateMenuDto(menu));
            }

            return new GetMenusOutput() { Menus = results };
        }

        // 获取单个菜单，包括其子菜单
        public GetMenuOutput GetMenu(GetMenuInput input) {
            var rootMenu = _menuManager.GetMenuForCache(input.MenuName);

            return new GetMenuOutput() { Menu = CreateMenuDto(rootMenu) };
        }

        private MenuDto CreateMenuDto(MenuBase menu)
        {
            MenuDto returnMenu = new MenuDto();

            returnMenu.Id = menu.Id;
            returnMenu.Name = menu.Name;
            returnMenu.DisplayName = menu.DisplayName;
            returnMenu.Icon = menu.Icon;
            returnMenu.PageName = menu.PageName;
            returnMenu.PageDataName = menu.PageDataName;

            if (menu is LeafMenu)
            {
                returnMenu.SetLeafMenuType();
                return returnMenu;
            }

            if (!(menu is CompositeMenu))
            {
                throw new UserFriendlyException("菜单转换异常");
            }

            returnMenu.SetCompositeMenuType();

            returnMenu.Menus = new List<MenuDto>();
            CompositeMenu compositeMenu = (CompositeMenu)menu;

            if (compositeMenu.Menus == null)
            {
                return returnMenu;
            }

            foreach (var childMenu in compositeMenu.Menus)
            {
                returnMenu.Menus.Add(CreateMenuDto(childMenu));
            }

            return returnMenu;
        }
    }
}
