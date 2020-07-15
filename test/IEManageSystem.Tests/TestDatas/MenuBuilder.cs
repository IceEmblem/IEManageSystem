using IEManageSystem.CMS.DomainModel.Menus;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace IEManageSystem.Tests.TestDatas
{
    /// <summary>
    /// 使用该数据需先加载 PageBuilder 数据
    /// </summary>
    public class MenuBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public MenuBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var pageData = _context.PageDatas.FirstOrDefault(e=>e.Name == "PageData1Name");

            var menu = new CompositeMenu("Main")
            {
                DisplayName = "主菜单",
                Icon = "",
                CompositeMenuId = null,
                RootMenuId = null,
                PageName = null,
                PageDataName = null,
                Menus = new List<MenuBase>() { 
                    
                }
            };

            var homeMenu = new LeafMenu("Home")
            {
                DisplayName = "主页",
                Icon = "",
                RootMenu = menu,
                PageName = "ContentPage1Name",
                PageDataName = "PageData1Name",
            };

            var postMenu = new CompositeMenu("post")
            {
                DisplayName = "文章分类",
                RootMenu = menu,
            };

            menu.Menus.Add(homeMenu);

            menu.Menus.Add(postMenu);

            _context.Menus.Add(menu);
        }
    }
}
