using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
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

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        public MenuManager(
            IRepository<MenuBase> menuRepository,
            IUnitOfWorkManager unitOfWorkManager)
        {
            MenuRepository = menuRepository;

            _unitOfWorkManager = unitOfWorkManager;
        }

        private List<MenuBase> GetMenus(MenuBase menu) 
        {
            List<MenuBase> menus = new List<MenuBase>();
            menus.Add(menu);

            if (!(menu is CompositeMenu)) {
                return menus;
            }

            CompositeMenu compositeMenu = (CompositeMenu)menu;

            foreach (var childMenu in compositeMenu.Menus) {
                menus.AddRange(GetMenus(childMenu));
            }

            return menus;
        }

        public void AddRootMenu(CompositeMenu menu) 
        {
            var menus = GetMenus(menu);

            // 不允许存在相同名称的菜单
            var names = menus.Select(e => e.Name);
            var duplicateMenu = MenuRepository.FirstOrDefault(e => names.Contains(e.Name));
            if (duplicateMenu != null) {
                throw new UserFriendlyException($"菜单{duplicateMenu.Name}以存在，请重新命名");
            }

            MenuRepository.Insert(menu);
        }

        //public void AddLeafMenu(LeafMenu menu)
        //{
        //    // 叶子菜单必须有父菜单
        //    if (!menu.CompositeMenuId.HasValue)
        //    {
        //        throw new UserFriendlyException("叶子菜单无法成为根菜单");
        //    }

        //    var parentMenu = GetCompositeMenu(menu.CompositeMenuId.Value);
        //    if (parentMenu == null)
        //    {
        //        throw new UserFriendlyException("无效的父菜单");
        //    }

        //    if (!(parentMenu is CompositeMenu)) 
        //    {
        //        throw new UserFriendlyException("父菜单必须为组合菜单");
        //    }

        //    menu.RootMenuId = parentMenu.RootMenuId ?? parentMenu.Id;

        //    if (IsExistMenuName(menu.Name))
        //    {
        //        throw new UserFriendlyException("该菜单名称已存在");
        //    }

        //    MenuRepository.Insert(menu);
        //}

        //public void AddCompositeMenu(CompositeMenu menu)
        //{
        //    // 如果有父菜单
        //    if (menu.CompositeMenuId.HasValue) 
        //    {
        //        var parentMenu = GetCompositeMenu(menu.CompositeMenuId.Value);
        //        if (parentMenu == null)
        //        {
        //            throw new UserFriendlyException("无效的父菜单");
        //        }

        //        if (!(parentMenu is CompositeMenu))
        //        {
        //            throw new UserFriendlyException("父菜单必须为组合菜单");
        //        }

        //        menu.RootMenuId = parentMenu.RootMenuId ?? parentMenu.Id;
        //    }

        //    if (IsExistMenuName(menu.Name))
        //    {
        //        throw new UserFriendlyException("该菜单名称已存在");
        //    }

        //    MenuRepository.Insert(menu);
        //}

        //private CompositeMenu GetCompositeMenu(int id)
        //{
        //    var menu = MenuRepository.FirstOrDefault(id);

        //    if (menu == null || !(menu is CompositeMenu))
        //    {
        //        return null;
        //    }

        //    return (CompositeMenu)menu;
        //}

        //private bool IsExistMenuName(string name)
        //{
        //    return MenuRepository.GetAll().Any(e => e.Name == name);
        //}

        //public void UpdateName(MenuBase menu, string name)
        //{
        //    var otherMenu = MenuRepository.GetAll().FirstOrDefault(e => e.Name == name);
        //    if (otherMenu != null && otherMenu != menu)
        //    {
        //        throw new UserFriendlyException("该菜单名称已存在");
        //    }

        //    menu.Name = name;
        //}

        public void UpdateRootMenu(int rootMenuId, CompositeMenu menu) 
        {
            using (var tran = _unitOfWorkManager.Begin()) 
            {
                // 移除根菜单所有菜单
                MenuRepository.Delete(e => e.RootMenuId == rootMenuId || e.Id == rootMenuId);

                _unitOfWorkManager.Current.SaveChanges();

                var menus = GetMenus(menu);
                // 不允许存在相同名称的菜单
                var names = menus.Select(e => e.Name);
                if (names.Distinct().Count() < names.Count()) {
                    throw new UserFriendlyException($"提交的菜单中包含重复的名称，请重新命名");
                }
                var duplicateMenu = MenuRepository.FirstOrDefault(e => names.Contains(e.Name));
                if (duplicateMenu != null)
                {
                    throw new UserFriendlyException($"菜单{duplicateMenu.Name}以存在，请重新命名");
                }

                MenuRepository.Insert(menu);

                _unitOfWorkManager.Current.SaveChanges();

                tran.Complete();
            }
        }

        public void RemoveRootMenu(int id) {
            // 移除根菜单所有菜单
            MenuRepository.Delete(e => e.RootMenuId == id || e.Id == id);
        }
    }
}
