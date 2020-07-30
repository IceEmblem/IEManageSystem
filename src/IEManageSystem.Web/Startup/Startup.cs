using System;
using Abp.AspNetCore;
using Abp.Castle.Logging.Log4Net;
using Abp.EntityFrameworkCore;
using IEManageSystem.EntityFrameworkCore;
using Castle.Facilities.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using IEManageSystem.JwtAuthentication;
using IEManageSystem.Web.Configuration;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;
using IEManageSystem.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.StaticFiles.Infrastructure;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging.Debug;
using IEManageSystem.Web.Conventions;

namespace IEManageSystem.Web.Startup
{
    public class Startup
    {
        private IConfigurationRoot _configurationRoot { get; }

        private IWebHostEnvironment _env { get; }

        public Startup(IWebHostEnvironment env)
        {
            _configurationRoot = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName);
            _env = env;
            WebConfiguration.Init(_configurationRoot);
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // 注册数据库上下文
            if (!string.IsNullOrWhiteSpace(_configurationRoot.GetConnectionString(IEManageSystemConsts.ConnectionStringName))) 
            {
                services.AddAbpDbContext<IEManageSystemDbContext>(options =>
                {
                    DbContextOptionsConfigurer.Configure(
                        options.DbContextOptions,
                        _configurationRoot.GetConnectionString(IEManageSystemConsts.ConnectionStringName),
                        _configurationRoot.GetSection("ConnectionType").Value);

                    if (_env.IsDevelopment())
                    {
                        LoggerFilterOptions loggerFilterOptions = new LoggerFilterOptions();
                        loggerFilterOptions.AddFilter((level) => level >= LogLevel.Information);

                        // 日志过滤器
                        options.DbContextOptions.UseLoggerFactory(new LoggerFactory(new[] { new DebugLoggerProvider() }, loggerFilterOptions));
                    }
                });
            }

            services.AddControllersWithViews(options =>
            {
                // .net core 自动将移除 Async 后缀，如方法 LoginAsync 的路由为 /Controller/Login
                // 设为发 false 则不会移除
                options.SuppressAsyncSuffixInActionNames = false;

                options.Conventions.Insert(0, new IEApiConvention());
            }).AddNewtonsoftJson(options => { 
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            // 添加单页
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            // 添加IEJwtBearer认证
            services.AddIEJwtBearer(
                WebConfiguration.Issuer,
                WebConfiguration.Audience,
                WebConfiguration.SymmetricKey);

            // 添加IE授权
            services.AddIEAuthorization();

            // Configure Abp and Dependency Injection
            return services.AddAbp<IEManageSystemWebModule>(options =>
            {
                // Configure Log4Net logging
                options.IocManager.IocContainer.AddFacility<LoggingFacility>(
                    f => f.UseAbpLog4Net().WithConfig("log4net.config")
                );
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseAbp(); //Initializes ABP framework.

            // 使用认证
            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.DefaultPage = "/index.html";
            });
        }
    }
}
