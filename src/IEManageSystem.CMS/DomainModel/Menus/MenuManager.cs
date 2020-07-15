using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.UI;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class MenuManager : ITransientDependency
    {
        public IEfRepository<MenuBase, int> MenuRepository { get; set; }

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        private IIEMemoryCache _cache { get; set; }

        public MenuManager(
            IEfRepository<MenuBase, int> menuRepository,
            IUnitOfWorkManager unitOfWorkManager,
            IIEMemoryCache cache)
        {
            MenuRepository = menuRepository;

            _unitOfWorkManager = unitOfWorkManager;

            _cache = cache;
        }

        private string GetMenuCacheName(string menuName) => $"PageManager_Page_{menuName}_";

        /// <summary>
        /// 从缓存获取根菜单
        /// </summary>
        /// <param name="menuName"></param>
        /// <returns></returns>
        public MenuBase GetMenuForCache(string menuName)
        {
            return _cache.GetOrCreate<MenuBase>(GetMenuCacheName(menuName), cacheEntity => {

                cacheEntity.SlidingExpiration = TimeSpan.FromHours(1);

                cacheEntity.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);

                cacheEntity.SetPriority(CacheItemPriority.NeverRemove);

                MenuRepository.NoTracking();
                var rootMenu = MenuRepository.FirstOrDefault(e => e.Name == menuName);
                if (rootMenu is CompositeMenu) { 
                    ((CompositeMenu) rootMenu).Menus = MenuRepository.GetAllList(e => e.RootMenuId == rootMenu.Id);
                }
                MenuRepository.Tracking();

                return rootMenu;
            });
        }

        // 使缓存失效
        public void SetMenuInvalidForCache(string menuName)
        {
            _cache.Remove(GetMenuCacheName(menuName));
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

        public void UpdateRootMenu(int rootMenuId, CompositeMenu menu) 
        {
            using (var tran = _unitOfWorkManager.Begin()) 
            {
                var oldMenu = MenuRepository.FirstOrDefault(e=>e.Id == rootMenuId);

                SetMenuInvalidForCache(oldMenu.Name);

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
            var oldMenu = MenuRepository.FirstOrDefault(e => e.Id == id);

            SetMenuInvalidForCache(oldMenu.Name);
            
            // 移除根菜单所有菜单
            MenuRepository.Delete(e => e.RootMenuId == id || e.Id == id);
        }
    }
}
