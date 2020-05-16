using IEManageSystem.Dtos.CMS;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Services.ManageHome.CMS.Menus;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using System.Linq;
using IEManageSystem.CMS.DomainModel.Menus;

namespace IEManageSystem.Application.Tests.Services.Menus
{
    public class MenuManageAppServiceTest : IEManageSystemTestBase
    {
        private IMenuManageAppService _menuManageAppService { get; set; }

        public MenuManageAppServiceTest() {
            _menuManageAppService = Resolve<IMenuManageAppService>();

            UsingDbContext(context => new PageBuilder(context).Build());
            UsingDbContext(context => new PageDataBuilder(context).Build());
            UsingDbContext(context => new MenuBuilder(context).Build());
        }

        [Fact]
        public void AddMenu_BaseTest() 
        {
            _menuManageAppService.AddMenu(new IEManageSystem.Services.ManageHome.CMS.Menus.Dto.AddMenuInput() { 
                Menu = new Dtos.CMS.MenuDto() { 
                    Id = 0,
                    Name = "AddMenu_BaseTest1",
                    DisplayName = "",
                    Icon = "",
                    MenuType = "CompositeMenu",
                    Menus = new List<MenuDto>() { 
                        new MenuDto(){ 
                            Name = "AddMenu_BaseTest2",
                            DisplayName = "",
                            Icon = "",
                            MenuType = "LeafMenu",
                        },
                        new MenuDto(){
                            Name = "AddMenu_BaseTest3",
                            DisplayName = "",
                            Icon = "",
                            MenuType = "CompositeMenu",
                            Menus = new List<MenuDto>() { 
                                new MenuDto(){
                                    Name = "AddMenu_BaseTest4",
                                    DisplayName = "",
                                    Icon = "",
                                    MenuType = "LeafMenu",
                                }
                            }
                        }
                    }
                }
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            var menu1 = dbContext.Menus.FirstOrDefault(e=>e.Name == "AddMenu_BaseTest1");
            Assert.True(menu1.CompositeMenuId == null);
            Assert.True(menu1.RootMenuId == null);
            Assert.True(menu1 is CompositeMenu);

            var menu2 = dbContext.Menus.FirstOrDefault(e => e.Name == "AddMenu_BaseTest2");
            Assert.True(menu2.CompositeMenuId == menu1.Id);
            Assert.True(menu2.RootMenuId == menu1.Id);
            Assert.True(menu2 is LeafMenu);

            var menu3 = dbContext.Menus.FirstOrDefault(e => e.Name == "AddMenu_BaseTest3");
            Assert.True(menu3.CompositeMenuId == menu1.Id);
            Assert.True(menu3.RootMenuId == menu1.Id);
            Assert.True(menu3 is CompositeMenu);

            var menu4 = dbContext.Menus.FirstOrDefault(e => e.Name == "AddMenu_BaseTest4");
            Assert.True(menu4.CompositeMenuId == menu3.Id);
            Assert.True(menu4.RootMenuId == menu1.Id);
            Assert.True(menu4 is LeafMenu);
        }

        /// <summary>
        /// 重复菜单测试，期望结果：添加失败
        /// </summary>
        [Fact]
        public void AddMenu_DuplicateMenuTest() {
            try
            {
                _menuManageAppService.AddMenu(new IEManageSystem.Services.ManageHome.CMS.Menus.Dto.AddMenuInput()
                {
                    Menu = new Dtos.CMS.MenuDto()
                    {
                        Id = 0,
                        Name = "Main",
                        DisplayName = "测试",
                        Icon = "",
                        MenuType = "CompositeMenu",
                        Menus = new List<MenuDto>()
                        {
                        }
                    }
                });
            }
            catch (Exception) { 
            
            }

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            var menus = dbContext.Menus.Where(e => e.Name == "Main").ToList();

            Assert.True(menus.Count == 1);
            Assert.True(menus[0].DisplayName == "主菜单");
        }

        [Fact]
        public void UpdateMenu_BaseTest() 
        {
            _menuManageAppService.AddMenu(new IEManageSystem.Services.ManageHome.CMS.Menus.Dto.AddMenuInput()
            {
                Menu = new Dtos.CMS.MenuDto()
                {
                    Id = 0,
                    Name = "UpdateMenu_BaseTest1",
                    DisplayName = "",
                    Icon = "",
                    MenuType = "CompositeMenu",
                    Menus = new List<MenuDto>() {
                        new MenuDto(){
                            Name = "UpdateMenu_BaseTest2",
                            DisplayName = "",
                            Icon = "",
                            MenuType = "LeafMenu",
                        }
                    }
                }
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            var rootMenu = dbContext.Menus.FirstOrDefault(e=>e.Name == "UpdateMenu_BaseTest1");
            _menuManageAppService.UpdateMenu(new IEManageSystem.Services.ManageHome.CMS.Menus.Dto.UpdateMenuInput() {
                Menu = new Dtos.CMS.MenuDto()
                {
                    Id = rootMenu.Id,
                    Name = "UpdateMenu_BaseTest1",
                    DisplayName = "测试菜单",
                    Icon = "",
                    MenuType = "CompositeMenu",
                    Menus = new List<MenuDto>() {
                        new MenuDto(){
                            Name = "UpdateMenu_BaseTest2",
                            DisplayName = "测试子菜单",
                            Icon = "",
                            MenuType = "LeafMenu",
                        }
                    }
                }
            });
            dbContext.SaveChanges();

            var newMenu = dbContext.Menus.FirstOrDefault(e => e.Name == "UpdateMenu_BaseTest2");
            Assert.True(newMenu.DisplayName == "测试子菜单");
        }

        [Fact]
        public void RemoveMenu_BaseTest() 
        {
            _menuManageAppService.AddMenu(new IEManageSystem.Services.ManageHome.CMS.Menus.Dto.AddMenuInput()
            {
                Menu = new Dtos.CMS.MenuDto()
                {
                    Id = 0,
                    Name = "RemoveMenu_BaseTest1",
                    DisplayName = "",
                    Icon = "",
                    MenuType = "CompositeMenu",
                    Menus = new List<MenuDto>() {
                        new MenuDto(){
                            Name = "RemoveMenu_BaseTest2",
                            DisplayName = "",
                            Icon = "",
                            MenuType = "LeafMenu",
                        }
                    }
                }
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            var rootMenu = dbContext.Menus.FirstOrDefault(e => e.Name == "RemoveMenu_BaseTest1");
            _menuManageAppService.RemoveMenu(new IEManageSystem.Services.ManageHome.CMS.Menus.Dto.RemoveMenuInput() { 
                Id = rootMenu.Id
            });
            dbContext.SaveChanges();

            // 删除根菜单，子菜单也一并删除
            Assert.True(dbContext.Menus.FirstOrDefault(e => e.Name == "RemoveMenu_BaseTest1") == null);
            Assert.True(dbContext.Menus.FirstOrDefault(e => e.Name == "RemoveMenu_BaseTest2") == null);
        }
    }
}
