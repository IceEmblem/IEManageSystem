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
using IEManageSystem.Services.Home.Menus.Dto;

namespace IEManageSystem.Services.Home.Menus
{
    public class MenuAppService : IEManageSystemAppServiceBase, IMenuAppService
    {
        private IEfRepository<MenuBase, int> _menuRepository;

        public MenuAppService(
            IEfRepository<MenuBase, int> menuRepository)
        {
            _menuRepository = menuRepository;
        }

        public GetMenusOutput GetMenus(GetMenusInput input)
        {
            Expression<Func<MenuBase, object>>[] propertySelectors = new Expression<Func<MenuBase, object>>[] {
                e=>e.PageData,
                e=>e.PageData.Page,
            };
            List<MenuBase> menus = _menuRepository.GetAllIncluding(propertySelectors).ToList();

            List<MenuBase> rootMenus = menus.Where(e => e.CompositeMenuId == null).ToList();

            List<MenuDto> results = new List<MenuDto>();

            foreach (MenuBase menu in rootMenus)
            {
                results.Add(CreateMenuDto(menu));
            }

            return new GetMenusOutput() { Menus = results };
        }

        private MenuDto CreateMenuDto(MenuBase menu)
        {
            MenuDto returnMenu = new MenuDto();

            returnMenu.Id = menu.Id;
            returnMenu.Name = menu.Name;
            returnMenu.DisplayName = menu.DisplayName;
            returnMenu.Icon = menu.Icon;
            returnMenu.PageName = menu.PageData?.Page?.Name;
            returnMenu.PageDataName = menu.PageData?.Name;

            if (menu is LeafMenu)
            {
                return returnMenu;
            }

            if (!(menu is CompositeMenu))
            {
                throw new UserFriendlyException("菜单转换异常");
            }

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
