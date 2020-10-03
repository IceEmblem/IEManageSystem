using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Services.ManageHome.CMS.Pages;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using System.Linq;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace IEManageSystem.Application.Tests.Services.Pages
{
    public class PageManageAppServiceTest : IEManageSystemTestBase
    {
        private IPageManageAppService _appService { get; set; }

        public PageManageAppServiceTest() {
            File.Delete("./wwwroot/Pages/AddContentPage_BaseTest.Page.json");
            File.Delete("./wwwroot/Pages/AddContentPage_BaseTest.json");

            File.Delete("./wwwroot/Pages/AddStaticPage_BaseTest.Page.json");
            File.Delete("./wwwroot/Pages/AddStaticPage_BaseTest.json");

            File.Delete("./wwwroot/Pages/UpdatePage_BaseTest.Page.json");
            File.Delete("./wwwroot/Pages/UpdatePage_BaseTest.json");

            File.Delete("./wwwroot/Pages/DeletePage_BaseTest.Page.json");
            File.Delete("./wwwroot/Pages/DeletePage_BaseTest.json");


            ApplyAbpSession();
            _appService = Resolve<IPageManageAppService>();
        }

        [Fact]
        public void AddContentPage_BaseTest() {
            ReloadDB();

            _appService.AddPage(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.AddPageInput() { 
                Page = new PageDto() {
                    Name = "AddContentPage_BaseTest",
                    Description = "Description1",
                    DisplayName = "DisplayName1",
                    Discriminator = Page.ContentPageDiscriminatorName
                }
            });

            var pageManager = LocalIocManager.Resolve<PageManager>();

            var page = pageManager.GetPagesForCache().FirstOrDefault(e => e.Name == "AddContentPage_BaseTest");

            Assert.True(page != null);
            Assert.True(page.Discriminator == Page.ContentPageDiscriminatorName);

            // 期望生成两个文件
            Assert.True(File.Exists("./wwwroot/Pages/AddContentPage_BaseTest.Page.json"));
            Assert.True(File.Exists("./wwwroot/Pages/AddContentPage_BaseTest.json"));

            File.Delete("./wwwroot/Pages/AddContentPage_BaseTest.Page.json");
            File.Delete("./wwwroot/Pages/AddContentPage_BaseTest.json");
        }

        [Fact]
        public void AddStaticPage_BaseTest() {
            ReloadDB();

            _appService.AddPage(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.AddPageInput() {
                Page = new PageDto() {
                    Name = "AddStaticPage_BaseTest",
                    Description = "Description1",
                    DisplayName = "DisplayName1",
                    Discriminator = Page.StaticPageDiscriminatorName
                }
            });

            var pageManager = LocalIocManager.Resolve<PageManager>();

            var page = pageManager.GetPagesForCache().FirstOrDefault(e => e.Name == "AddStaticPage_BaseTest");

            Assert.True(page != null);
            Assert.True(page.Discriminator == Page.StaticPageDiscriminatorName);

            // 期望生成两个文件
            Assert.True(File.Exists("./wwwroot/Pages/AddStaticPage_BaseTest.Page.json"));
            Assert.True(File.Exists("./wwwroot/Pages/AddStaticPage_BaseTest.json"));

            File.Delete("./wwwroot/Pages/AddStaticPage_BaseTest.Page.json");
            File.Delete("./wwwroot/Pages/AddStaticPage_BaseTest.json");
        }

        [Fact]
        public void UpdatePage_BaseTest() {
            ReloadDB();

            _appService.AddPage(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.AddPageInput()
            {
                Page = new PageDto() {
                    Name = "UpdatePage_BaseTest",
                    Description = "Description1",
                    DisplayName = "DisplayName1",
                    Discriminator = Page.ContentPageDiscriminatorName
                }
            });

            _appService.UpdatePage(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.UpdatePageInput() {
                Page = new PageDto() {
                    Name = "UpdatePage_BaseTest",
                    Description = "Description2",
                    DisplayName = "DisplayName2",
                    Discriminator = Page.ContentPageDiscriminatorName
                },
                PageCompleteJson = "{}"
            });

            var pageManager = LocalIocManager.Resolve<PageManager>();

            var page = pageManager.GetPagesForCache().FirstOrDefault(e => e.Name == "UpdatePage_BaseTest");

            Assert.True(page != null);
            Assert.True(page.Discriminator == Page.ContentPageDiscriminatorName);
            Assert.True(page.DisplayName == "DisplayName2");

            // 期望更新 UpdatePage_BaseTest.json 文件
            Assert.True(File.ReadAllText("./wwwroot/Pages/UpdatePage_BaseTest.json") == "{}");

            File.Delete("./wwwroot/Pages/UpdatePage_BaseTest.Page.json");
            File.Delete("./wwwroot/Pages/UpdatePage_BaseTest.json");
        }

        [Fact]
        public void DeletePage_BaseTest()
        {
            ReloadDB();

            _appService.AddPage(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.AddPageInput()
            {
                Page = new PageDto() {
                    Name = "DeletePage_BaseTest",
                    Description = "Description1",
                    DisplayName = "DisplayName1",
                    Discriminator = Page.ContentPageDiscriminatorName
                }
            });

            // 期望生成两个文件
            Assert.True(File.Exists("./wwwroot/Pages/DeletePage_BaseTest.Page.json"));
            Assert.True(File.Exists("./wwwroot/Pages/DeletePage_BaseTest.json"));

            _appService.DeletePage(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.DeletePageInput()
            {
                Name = "DeletePage_BaseTest"
            });

            var pageManager = LocalIocManager.Resolve<PageManager>();

            var page = pageManager.GetPagesForCache().FirstOrDefault(e => e.Name == "DeletePage_BaseTest");

            Assert.True(page == null);

            // 期望删除对应的文件
            Assert.True(!File.Exists("./wwwroot/Pages/DeletePage_BaseTest.Page.json"));
            Assert.True(!File.Exists("./wwwroot/Pages/DeletePage_BaseTest.json"));
        }

        [Fact]
        public void UpdateContentPagePermission() {
            ReloadDB();

            _appService.UpdateContentPagePermission(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.UpdateContentPagePermissionInput()
            {
                Name = "ContentPage1Name",
                ContentPagePeimissionCollection = new ContentPagePeimissionCollectionDto()
                {
                    IsEnableQueryPermission = false,
                    ContentPagePermissions = new List<ContentPagePermissionDto>()
                }
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            var contentPagePeimissionCollection =
                dbContext.Set<ContentPagePermissionCollection>()
                    .Include(e => e.ContentPagePermissions)
                    .FirstOrDefault(e => e.PageName == "ContentPage1Name");
            Assert.True(contentPagePeimissionCollection.ContentPagePermissions.Count == 0);
            Assert.True(contentPagePeimissionCollection.IsEnableQueryPermission == false);
        }
    }
}
