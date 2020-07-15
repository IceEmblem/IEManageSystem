using IEManageSystem.Services.ManageHome.CMS.Menus;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using System.Linq;

namespace IEManageSystem.Application.Tests.Services.Menus
{
    public class MenuAppServiceTest : IEManageSystemTestBase
    {
        private IMenuAppService _menuAppService { get; set; }

        public MenuAppServiceTest() {
            _menuAppService = LocalIocManager.Resolve<IMenuAppService>();

            UsingDbContext(context => new PageBuilder(context).Build());
            UsingDbContext(context => new PageDataBuilder(context).Build());
            UsingDbContext(context => new MenuBuilder(context).Build());
        }

        /// <summary>
        /// 期望获取根菜单，子菜单不要出现
        /// </summary>
        [Fact]
        public void GetMenus_BaseTest() {
            var output = _menuAppService.GetMenus(new IEManageSystem.Services.ManageHome.CMS.Menus.Dto.GetMenusInput());

            Assert.True(output.Menus.FirstOrDefault().Name == "Main");
            Assert.True(output.Menus.Count == 1);
        }

        /// <summary>
        /// 期望获取到某个菜单及其子菜单
        /// </summary>
        [Fact]
        public void GetMenu_BaseTest() {
            var output = _menuAppService.GetMenu(new IEManageSystem.Services.ManageHome.CMS.Menus.Dto.GetMenuInput() { 
                MenuName = "Main"
            });

            Assert.True(output.Menu.Name == "Main");
            Assert.True(output.Menu.Menus.Count == 2);
        }
    }
}
