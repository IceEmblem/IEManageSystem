using Castle.Core.Logging;
using IEIdentityServer.Core.Help.Exceptions;
using IEManageSystem.Api.Models;
using IEManageSystem.Help.Exceptions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Middlewares
{
    public class ExceptionHandleExMiddleware
    {
        private readonly RequestDelegate _next;

        private ILogger _Logger { get; set; }

        public ExceptionHandleExMiddleware(RequestDelegate next, ILogger logger)
        {
            _next = next;

            _Logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (MessageException ex)
            {
                await HandleMessageException(ex, context);
            }
            catch (IEIdentityException ex)
            {
                await HandleMessageException(ex, context);
            }
            catch (Exception ex)
            {
                RecordExceptionLog(ex);

                ApiResultDataModel result = new ApiResultDataModel()
                {
                    IsSuccess = false,
                    Message = "发生未知错误，请联系管理员",
                };
                context.Response.ContentType = "text/plain";

                //设置序列化时key为驼峰样式
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                settings.Formatting = Formatting.Indented;
                await context.Response.WriteAsync(JsonConvert.SerializeObject(result, settings));
            }
        }

        /// <summary>
        /// 处理消息异常
        /// </summary>
        private async Task HandleMessageException(Exception ex, HttpContext context)
        {
            RecordExceptionLog(ex);

            ApiResultDataModel result = new ApiResultDataModel()
            {
                IsSuccess = false,
                Message = ex.Message,
            };
            context.Response.ContentType = "text/plain";

            //设置序列化时key为驼峰样式
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            settings.Formatting = Formatting.Indented;
            await context.Response.WriteAsync(JsonConvert.SerializeObject(result, settings));
        }

        /// <summary>
        /// 记录异常日志
        /// </summary>
        private void RecordExceptionLog(Exception ex)
        {
            string methodName = ex.TargetSite.Name;
            string controllerName = ex.TargetSite.DeclaringType.FullName;
            string now = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss:ffff");

            string errorMessage = $"时间：{now}，控制器：{controllerName}，方法：{methodName}，异常：{ex.Message}";

            _Logger.Error(errorMessage);
        }
    }
}
