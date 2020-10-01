using Abp.Runtime.Session;
using Abp.TestBase.Runtime.Session;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Services.ManageHome.CMS.Pages;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
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
            ApplyAbpSession();

            _appService = Resolve<IPageDataManageAppService>();
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

            Assert.True(dbContext.PageDatas.Any(e => e.Name == "AddPageData_BaseTest_Name" && e.Creator.EditorId == 1 && e.LastUpdater.EditorId == 1));
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

            Assert.True(dbContext.PageDatas.Any(e => e.Name == "UpdatePageData_BaseTest_Name1" && e.Creator.EditorId == 1 && e.LastUpdater.EditorId == 1));
            Assert.True(!dbContext.PageDatas.Any(e => e.Name == "UpdatePageData_BaseTest_Name"));
        }

        /// <summary>
        /// 创造者更新文章
        /// </summary>
        [Fact]
        public void UpdatePageDataOfCreator_BaseTest()
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

            _appService.UpdatePageDataOfCreator(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.UpdatePageDataInput()
            {
                PageName = "ContentPage1Name",
                Id = post.Id,
                Name = "UpdatePageData_BaseTest_Name1",
                Title = "UpdatePageData_BaseTest_Title1",
                Tags = new List<TagDto>()
            });

            dbContext.SaveChanges();

            Assert.True(dbContext.PageDatas.Any(e => e.Name == "UpdatePageData_BaseTest_Name1" && e.Creator.EditorId == 1 && e.LastUpdater.EditorId == 1));
            Assert.True(!dbContext.PageDatas.Any(e => e.Name == "UpdatePageData_BaseTest_Name"));
        }

        /// <summary>
        /// 非文章的创建者不能修改文章
        /// </summary>
        [Fact]
        public void UpdatePageDataOfCreator_NoCreator() {
            ReloadDB();

            var testAbpSession = (TestAbpSession)Resolve<IAbpSession>();
            testAbpSession.UserId = 2;
            testAbpSession.TenantId = 1;

            bool isPass = true;

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            var post = dbContext.PageDatas.FirstOrDefault(e => e.Name == "PageData1Name");

            try
            {
                _appService.UpdatePageDataOfCreator(new UpdatePageDataInput()
                {
                    PageName = "ContentPage1Name",
                    Id = post.Id,
                    Name = "UpdatePageData_BaseTest_Name1",
                    Title = "UpdatePageData_BaseTest_Title1",
                    Tags = new List<TagDto>()
                });

                dbContext.SaveChanges();
            }
            catch (UserFriendlyException) {
                isPass = false;
            }

            // 还原 AbpSession
            ApplyAbpSession();

            Assert.True(isPass == false);
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
            Assert.True(!dbContext.Set<ComponentSingleData>().Any(e => e.Name == "PageData1_ContentComponentData1_SingleComponentData2Name"));
        }

        /// <summary>
        /// 创造者删除文章
        /// </summary>
        [Fact]
        public void DeletePageDataOfCreator_BaseTest()
        {
            ReloadDB();

            _appService.DeletePageDataOfCreator(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.DeletePageDataInput()
            {
                PageName = "ContentPage1Name",
                Name = "PageData1Name"
            });

            var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
            dbContext.SaveChanges();

            Assert.True(!dbContext.Set<PageData>().Any(e => e.Name == "PageData1Name"));
            Assert.True(!dbContext.Set<ContentComponentData>().Any(e => e.Sign == "ContentPage1_Component1Sign"));
            Assert.True(!dbContext.Set<ComponentSingleData>().Any(e => e.Name == "PageData1_ContentComponentData1_SingleComponentData2Name"));
        }

        /// <summary>
        /// 非文章的创建者不能删除文章
        /// </summary>
        [Fact]
        public void DeletePageDataOfCreator_NoCreator()
        {
            ReloadDB();

            bool isPass = true;

            var testAbpSession = (TestAbpSession)Resolve<IAbpSession>();
            testAbpSession.UserId = 2;
            testAbpSession.TenantId = 1;

            try
            {
                _appService.DeletePageDataOfCreator(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.DeletePageDataInput()
                {
                    PageName = "ContentPage1Name",
                    Name = "PageData1Name"
                });

                var dbContext = LocalIocManager.Resolve<IEManageSystemDbContext>();
                dbContext.SaveChanges();
            }
            catch (UserFriendlyException)
            {
                isPass = false;
            }

            // 还原 AbpSession
            ApplyAbpSession();

            Assert.True(isPass == false);
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
            Assert.True(!dbContext.Set<ComponentSingleData>().Any(e => e.Name == "PageData1_ContentComponentData1_SingleComponentData2Name"));

            // 添加新的数据
            Assert.True(dbContext.Set<ContentComponentData>().Any(e => e.Sign == "UpdateComponentData_BaseTest_ContentComponentDataSign"));
            Assert.True(dbContext.Set<ComponentSingleData>().Any(e => e.Name == "UpdateComponentData_BaseTest_SingleComponentDataName"));
        }

        /// <summary>
        /// 创造者更新组件数据
        /// </summary>
        [Fact]
        public void UpdateComponentDataOfCreator_BaseTest()
        {
            ReloadDB();

            _appService.UpdateComponentDataOfCreator(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.UpdateComponentDataInput()
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
            Assert.True(!dbContext.Set<ComponentSingleData>().Any(e => e.Name == "PageData1_ContentComponentData1_SingleComponentData2Name"));

            // 添加新的数据
            Assert.True(dbContext.Set<ContentComponentData>().Any(e => e.Sign == "UpdateComponentData_BaseTest_ContentComponentDataSign"));
            Assert.True(dbContext.Set<ComponentSingleData>().Any(e => e.Name == "UpdateComponentData_BaseTest_SingleComponentDataName"));
        }

        /// <summary>
        /// 非文章创造者不能更新组件数据
        /// </summary>
        [Fact]
        public void UpdateComponentDataOfCreator_NoCreator()
        {
            ReloadDB();

            bool isPass = true;

            var testAbpSession = (TestAbpSession)Resolve<IAbpSession>();
            testAbpSession.UserId = 2;
            testAbpSession.TenantId = 1;

            try
            {
                _appService.UpdateComponentDataOfCreator(new IEManageSystem.Services.ManageHome.CMS.Pages.Dto.UpdateComponentDataInput()
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
            }
            catch (UserFriendlyException)
            {
                isPass = false;
            }

            // 还原 AbpSession
            ApplyAbpSession();

            Assert.True(isPass == false);
        }
    }
}
