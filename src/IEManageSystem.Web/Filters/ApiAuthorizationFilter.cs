using Abp.Web.Models;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.Attributes;
using IEManageSystem.JwtAuthentication.Authorizations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Filters
{
    /// <summary>
    /// Api授权过滤器
    /// </summary>
    public class ApiAuthorizationFilter : IAsyncAuthorizationFilter
    {
        private string _apiScopeName { get; set; }

        public ApiAuthorizationFilter(string apiScopeName)
        {
            _apiScopeName = apiScopeName;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var controllerActionDescriptor = (Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor;

            // 是否有应用Api查询特性
            bool isQueryAction = false;
            foreach (var attr in controllerActionDescriptor.MethodInfo.CustomAttributes) {
                if (attr.AttributeType == typeof(ApiAuthorizationQueryAttribute)) {
                    isQueryAction = true;
                    break;
                }
            }

            var checkPermissionService = context.HttpContext.RequestServices.GetRequiredService<CheckPermissionService>();

            var requirement = new IEAuthorizationRequirement(permissions =>
                                            checkPermissionService.IsAllowAccess(
                                                _apiScopeName,
                                                isQueryAction,
                                                permissions));

            var authorizationService = context.HttpContext.RequestServices.GetRequiredService<IAuthorizationService>();

            var authorizationResult = await authorizationService.AuthorizeAsync(context.HttpContext.User, null, requirement);

            if (!authorizationResult.Succeeded)
            {
                context.Result = new ObjectResult(new AjaxResponse(new ErrorInfo("未授权操作"), true))
                {
                    StatusCode = context.HttpContext.User.Identity.IsAuthenticated
                            ? (int)System.Net.HttpStatusCode.Forbidden
                            : (int)System.Net.HttpStatusCode.Unauthorized
                };
            }
        }
    }
}
