using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Tests.TestDatas
{
    /// <summary>
    /// 运行该生成请先运行 PermissionBuilder
    /// </summary>
    public class PageBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public PageBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var permission = _context.Permissions.FirstOrDefault(e=>e.Name == "Permission1");

            var contentPage = new ContentPage("ContentPage1Name")
            {
                DisplayName = "测试内容页",
                Description = "用于测试的数据",
                ContentPagePermissionCollection = new ContentPagePermissionCollection() { 
                    IsEnableQueryPermission = true,
                    ContentPagePermissions = new List<ContentPagePermission>() {
                        new ContentPagePermission(){ Permission = permission, IsManage = false },
                        new ContentPagePermission(){ Permission = permission, IsManage = true }
                    },
                }
            };

            _context.Pages.Add(contentPage);

            _context.DefaultComponentDatas.AddRange(new List<DefaultComponentData>() {
                new DefaultComponentData(){
                    Sign = "ContentPage1_Component1Sign",
                    SingleDatas = new List<SingleComponentData>(){
                        new SingleComponentData(){ Name = "PageData1_DefaultComponentData1_SingleComponentData1Name" },
                        new SingleComponentData(){ Name = "PageData1_DefaultComponentData1_SingleComponentData2Name" }
                    },
                    Page = contentPage
                },
                new DefaultComponentData(){ Sign = "ContentPage1_Component2Sign", Page = contentPage }
            }) ;

            var staticPage = new StaticPage("StaticPageName")
            {
                DisplayName = "测试内容页",
                Description = "用于测试的数据",
            };

            _context.Pages.Add(staticPage);
        }
    }
}
