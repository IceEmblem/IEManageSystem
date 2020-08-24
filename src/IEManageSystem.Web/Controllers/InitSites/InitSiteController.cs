using Abp.Dependency;
using Abp.Json;
using Abp.UI;
using Castle.MicroKernel.Registration;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Configuration;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Web.Controllers.InitSites.Dto;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Controllers.InitSites
{
    [Route("api/[controller]/[action]")]
    public class InitSiteController : IEManageSystemControllerBase
    {
        private IWebHostEnvironment _webHostEnvironment { get; }

        public InitSiteController(
            IWebHostEnvironment webHostEnvironment) 
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        public ActionResult<InitOutput> Init([FromBody] InitInput input)
        {
            if (string.IsNullOrWhiteSpace(input.SqlType)
                || string.IsNullOrWhiteSpace(input.ConnectString))
            {
                throw new UserFriendlyException("请选择数据库类型并填写数据库连接字符串");
            }

            // 检查配置文件
            var rootConfiguration = AppConfigurations.Get(_webHostEnvironment.ContentRootPath, _webHostEnvironment.EnvironmentName);
            if (!string.IsNullOrWhiteSpace(rootConfiguration["ConnectionStrings:Default"]))
            {
                throw new UserFriendlyException("站点已初始化，如需重新初始化，请设置 appsettings.json 的 ConnectionStrings:Default 为空");
            }

            // 测试数据库连接
            DbContextOptionsBuilder<IEManageSystemDbContext> dbOptionsBuilder = new DbContextOptionsBuilder<IEManageSystemDbContext>();
            try
            {
                DbContextOptionsConfigurer.Configure(dbOptionsBuilder, input.ConnectString, input.SqlType);
            }
            catch (Exception ex) 
            {
                throw new UserFriendlyException(ex.Message);
            }

            var db = new IEManageSystemDbContext(dbOptionsBuilder.Options);
            if (!db.Database.CanConnect()) {
                throw new UserFriendlyException("数据库连接失败，请检查连接字符串是否正确");
            }

            // 如果数据库有已有数据，则不能运行初始化
            bool isExistData = false;
            try
            {
                if (db.Users.Any())
                {
                    isExistData = true;
                }
            }
            catch (Exception)
            {
            }

            if (isExistData) {
                throw new UserFriendlyException("数据库已存在数据，无法初始化");
            }


            // 修改 json 配置
            string appsettingsFilePath = $"{_webHostEnvironment.ContentRootPath}\\appsettings.json";
            if (!System.IO.File.Exists(appsettingsFilePath)) {
                appsettingsFilePath = $"{_webHostEnvironment.ContentRootPath}\\appsettings.{_webHostEnvironment.EnvironmentName}.json";

                if (!System.IO.File.Exists(appsettingsFilePath))
                {
                    throw new UserFriendlyException("配置文件丢失，无法添加配置");
                }
            }

            string oldJsonStr = System.IO.File.ReadAllText(appsettingsFilePath);

            dynamic oldJson = JsonConvert.DeserializeObject(oldJsonStr);
            oldJson.ConnectionStrings.Default = input.ConnectString;
            oldJson.ConnectionType = input.SqlType;
            string jsonStr = JsonConvert.SerializeObject(oldJson);

            System.IO.File.WriteAllText(appsettingsFilePath, jsonStr);

            rootConfiguration.Reload();

            // 重新注入数据库选项
            IocManager.Instance.IocContainer.Register(
                Component.For(typeof(DbContextOptions<IEManageSystemDbContext>)).Instance(dbOptionsBuilder.Options).LifestyleSingleton()
                );

            // 初始化数据库
            IocManager.Instance.Resolve<IEManageSystemDbContext>().Database.EnsureCreated();

            // 初始化超级管理员
            IocManager.Instance.Resolve<InitializeSuperAdmin>().Initialize();

            // 动态添加Api域
            IocManager.Instance.Resolve<ApiScopeProvider>().Register();

            return new InitOutput();
        }
    }
}
