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
using IEManageSystem.Api.Configuration;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;
using IEManageSystem.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.StaticFiles.Infrastructure;

namespace IEManageSystem.Web.Startup
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            WebConfiguration.Init(AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName));
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // 注册数据库上下文
            services.AddAbpDbContext<IEManageSystemDbContext>(options =>
            {
                DbContextOptionsConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
            });

            services.AddMvc(options =>
            {
                // 防止 XSRF/CSRF（跨站请求伪造） 攻击，我们使用 JWT 进行身份验证，不存在 XSRF/CSRF
                // options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
            })
            .AddJsonOptions(options =>
            {
                // 解决循环引用时的序列化
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

            app.UseMvc();

            app.UseSpa(spa =>
            {
                spa.Options.DefaultPage = "/Index.html";
            });
        }
    }
}
