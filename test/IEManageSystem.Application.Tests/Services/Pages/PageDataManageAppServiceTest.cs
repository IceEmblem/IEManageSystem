using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Services.ManageHome.CMS.Pages;
using IEManageSystem.Tests;
using IEManageSystem.Tests.TestDatas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace IEManageSystem.Application.Tests.Services.Pages
{
    public class PageDataManageAppServiceTest : IEManageSystemTestBase
    {
        private IPageDataManageAppService _appService { get; set; }

        public PageDataManageAppServiceTest()
        {
            _appService = Resolve<IPageDataManageAppService>();
        }

        private void ReloadDB()
        {
            UsingDbContext(context => context.Database.EnsureDeleted());
            UsingDbContext(context => context.Database.EnsureCreated());
            UsingDbContext(context => new PermissionBuilder(context).Build());
            UsingDbContext(context => new PageBuilder(context).Build());
            UsingDbContext(context => new PageDataBuilder(context).Build());
        }


        /// <summary>
        /// 添加文章，期望只添加聚合根
        /// </summary>
        [Fact]
        public void AddPageData_BaseTest()
        {
            ReloadDB();

            _appService.AddPageData(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.AddPageDataInput()
            {
                PageName = "ContentPage1Name",
                Name = "AddPageData_BaseTest_Name",
                Title = "AddPageData_BaseTest_Title",
                Tags = new List<TagDto>()
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            Assert.True(dbContext.PageDatas.Any(e => e.Name == "AddPageData_BaseTest_Name"));
        }

        /// <summary>
        /// 更新文章，期望只更新聚合根
        /// </summary>
        [Fact]
        public void UpdatePageData_BaseTest()
        {
            ReloadDB();

            _appService.AddPageData(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.AddPageDataInput()
            {
                PageName = "ContentPage1Name",
                Name = "UpdatePageData_BaseTest_Name",
                Title = "UpdatePageData_BaseTest_Title",
                Tags = new List<TagDto>()
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();
            var post = dbContext.PageDatas.FirstOrDefault(e => e.Name == "UpdatePageData_BaseTest_Name");

            _appService.UpdatePageData(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.UpdatePageDataInput()
            {
                PageName = "ContentPage1Name",
                Id = post.Id,
                Name = "UpdatePageData_BaseTest_Name1",
                Title = "UpdatePageData_BaseTest_Title1",
                Tags = new List<TagDto>()
            });

            dbContext.SaveChanges();

            Assert.True(dbContext.PageDatas.Any(e => e.Name == "UpdatePageData_BaseTest_Name1"));
            Assert.True(!dbContext.PageDatas.Any(e => e.Name == "UpdatePageData_BaseTest_Name"));
        }

        /// <summary>
        /// 删除文章，期望文章下所有东西都删除
        /// </summary>
        [Fact]
        public void DeletePageData_BaseTest()
        {
            ReloadDB();

            _appService.DeletePageData(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.DeletePageDataInput()
            {
                PageName = "ContentPage1Name",
                Name = "PageData1Name"
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            Assert.True(!dbContext.Set<PageData>().Any(e => e.Name == "PageData1Name"));
            Assert.True(!dbContext.Set<ContentComponentData>().Any(e => e.Sign == "ContentPage1_Component1Sign"));
            Assert.True(!dbContext.Set<SingleComponentData>().Any(e => e.Name == "PageData1_ContentComponentData1_SingleComponentData2Name"));
        }

        /// <summary>
        /// 更新组件数据
        /// </summary>
        [Fact]
        public void UpdateComponentData_BaseTest()
        {
            ReloadDB();

            _appService.UpdateComponentData(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.UpdateComponentDataInput()
            {
                PageName = "ContentPage1Name",
                PageDataName = "PageData1Name",
                ComponentDatas = new List<ComponentDataDto>() {
                    new ComponentDataDto(){
                        Sign = "UpdateComponentData_BaseTest_ContentComponentDataSign",
                        SingleDatas = new List<SingleComponentDataDto>(){
                            new SingleComponentDataDto(){ Name = "UpdateComponentData_BaseTest_SingleComponentDataName" }
                        }
                    }
                }
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            // 移除所有旧的数据
            Assert.True(!dbContext.Set<ContentComponentData>().Any(e => e.Sign == "ContentPage1_Component1Sign"));
            Assert.True(!dbContext.Set<SingleComponentData>().Any(e => e.Name == "PageData1_ContentComponentData1_SingleComponentData2Name"));

            // 添加新的数据
            Assert.True(dbContext.Set<ContentComponentData>().Any(e => e.Sign == "UpdateComponentData_BaseTest_ContentComponentDataSign"));
            Assert.True(dbContext.Set<SingleComponentData>().Any(e => e.Name == "UpdateComponentData_BaseTest_SingleComponentDataName"));
        }
    }
}
