using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class MenuManager : ITransientDependency
    {
        public IRepository<MenuBase> MenuRepository { get; set; }

        public MenuManager(
            IRepository<MenuBase> menuRepository)
        {
            MenuRepository = menuRepository;
        }

        public void AddLeafMenu(LeafMenu menu)
        {
            // 叶子菜单必须有父菜单
            if (!menu.CompositeMenuId.HasValue)
            {
                throw new UserFriendlyException("叶子菜单无法成为根菜单");
            }

            var parentMenu = GetCompositeMenu(menu.CompositeMenuId.Value);
            if (parentMenu == null)
            {
                throw new UserFriendlyException("无效的父菜单");
            }

            if (!(parentMenu is CompositeMenu)) 
            {
                throw new UserFriendlyException("父菜单必须为组合菜单");
            }

            menu.RootMenuId = parentMenu.RootMenuId ?? parentMenu.Id;

            if (IsExistMenuName(menu.Name))
            {
                throw new UserFriendlyException("该菜单名称已存在");
            }

            MenuRepository.Insert(menu);
        }

        public void AddCompositeMenu(CompositeMenu menu)
        {
            // 如果有父菜单
            if (menu.CompositeMenuId.HasValue) 
            {
                var parentMenu = GetCompositeMenu(menu.CompositeMenuId.Value);
                if (parentMenu == null)
                {
                    throw new UserFriendlyException("无效的父菜单");
                }

                if (!(parentMenu is CompositeMenu))
                {
                    throw new UserFriendlyException("父菜单必须为组合菜单");
                }

                menu.RootMenuId = parentMenu.RootMenuId ?? parentMenu.Id;
            }

            if (IsExistMenuName(menu.Name))
            {
                throw new UserFriendlyException("该菜单名称已存在");
            }

            MenuRepository.Insert(menu);
        }

        private CompositeMenu GetCompositeMenu(int id)
        {
            var menu = MenuRepository.FirstOrDefault(id);

            if (menu == null || !(menu is CompositeMenu))
            {
                return null;
            }

            return (CompositeMenu)menu;
        }

        private bool IsExistMenuName(string name)
        {
            return MenuRepository.GetAll().Any(e => e.Name == name);
        }

        public void UpdateName(MenuBase menu, string name)
        {
            var otherMenu = MenuRepository.GetAll().FirstOrDefault(e => e.Name == name);
            if (otherMenu != null && otherMenu != menu)
            {
                throw new UserFriendlyException("该菜单名称已存在");
            }

            menu.Name = name;
        }

        public void RemoveMenu(int id) {
            if (MenuRepository.Count(e => e.CompositeMenuId == id) > 0) {
                throw new UserFriendlyException("无法移除菜单，请确保该菜单无子菜单");
            }

            MenuRepository.Delete(id);
        }
    }
}
