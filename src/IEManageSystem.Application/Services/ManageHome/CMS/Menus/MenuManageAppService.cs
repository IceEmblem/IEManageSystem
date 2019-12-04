using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Abp.Domain.Repositories;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel.Menus;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Repositorys;
using IEManageSystem.Services.ManageHome.CMS.Menus.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Menus
{
    [ApiAuthorization(ApiScopeProvider.Menu)]
    public class MenuManageAppService : IEManageSystemAppServiceBase, IMenuManageAppService
    {
        private MenuManager _menuManager { get; set; }

        private IRepository<MenuBase> _menuRepository => _menuManager.MenuRepository;

        private IEfRepository<PageData, int> _pageDataRepository { get; set; }

        public MenuManageAppService(
            MenuManager menuManager,
            IEfRepository<PageData, int> pageDataRepository)
        {
            _menuManager = menuManager;
            _pageDataRepository = pageDataRepository;
        }

        private PageData GetPageData(string pageName, string pageDataName)
        {
            if (string.IsNullOrWhiteSpace(pageName) && string.IsNullOrWhiteSpace(pageDataName)) {
                return null;
            }

            var pageDatas = _pageDataRepository.GetAll();
            if (!string.IsNullOrWhiteSpace(pageName))
            {
                pageDatas = pageDatas.Where(e => e.Page.Name == pageName);
            }
            if (!string.IsNullOrWhiteSpace(pageDataName))
            {
                pageDatas = pageDatas.Where(e => e.Name == pageDataName);
            }
            var pageData = pageDatas.FirstOrDefault();

            return pageData;
        }

        public AddLeafMenuOutput AddLeafMenu(AddLeafMenuInput input)
        {
            LeafMenu leafMenu = new LeafMenu(input.Name)
            {
                CompositeMenuId = input.ParentMenuId,
                DisplayName = input.DisplayName,
                Icon = input.Icon
            };

            var pageData = GetPageData(input.PageName, input.PageDataName);
            leafMenu.PageData = pageData;

            _menuManager.AddLeafMenu(leafMenu);

            return new AddLeafMenuOutput();
        }

        public AddCompositeMenuOutput AddCompositeMenu(AddCompositeMenuInput input)
        {
            CompositeMenu compositeMenu = new CompositeMenu(input.Name)
            {
                CompositeMenuId = input.ParentMenuId,
                DisplayName = input.DisplayName,
                Icon = input.Icon
            };

            var pageData = GetPageData(input.PageName, input.PageDataName);
            compositeMenu.PageData = pageData;

            _menuManager.AddCompositeMenu(compositeMenu);

            return new AddCompositeMenuOutput();
        }

        public RemoveMenuOutput RemoveMenu(RemoveMenuInput input)
        {
            _menuManager.RemoveMenu(input.Id);

            return new RemoveMenuOutput();
        }

        public UpdateMenuOutput UpdateMenu(UpdateMenuInput input)
        {
            var menu = _menuRepository.FirstOrDefault(input.Id);

            _menuManager.UpdateName(menu, input.Name);
            menu.DisplayName = input.DisplayName;
            menu.Icon = input.Icon;

            var pageData = GetPageData(input.PageName, input.PageDataName);
            menu.PageData = pageData;

            return new UpdateMenuOutput();
        }
    }
}
