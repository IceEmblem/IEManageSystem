using IEManageSystem.Attributes;
using IEManageSystem.Web.Filters;
using IEManageSystem.Web.Help;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Conventions
{
    public class IEApiConvention : IApplicationModelConvention
    {
        //接口的Apply方法
        public void Apply(ApplicationModel application)
        {
            foreach (var controllerModel in application.Controllers) 
            {
                foreach (var attr in controllerModel.Attributes)
                {
                    // 如果控制器有应用ApiAuthorization特性
                    if (attr.GetType() == typeof(ApiAuthorizationAttribute) ||
                       attr.GetType().IsSubclassOf(typeof(ApiAuthorizationAttribute)))
                    {

                        var apiAuthorizationAttribute = (ApiAuthorizationAttribute)attr;

                        // 添加授权过滤器
                        controllerModel.Filters.Add(new ApiAuthorizationFilter(apiAuthorizationAttribute.ApiScopeName));
                    }
                }

                foreach (var action in controllerModel.Actions)
                {
                    foreach (var attr in action.Attributes)
                    {
                        // 如果控制器有应用ApiAuthorization特性
                        if (attr.GetType() == typeof(ApiAuthorizationAttribute) ||
                           attr.GetType().IsSubclassOf(typeof(ApiAuthorizationAttribute)))
                        {

                            var apiAuthorizationAttribute = (ApiAuthorizationAttribute)attr;

                            // 添加授权过滤器
                            action.Filters.Add(new ApiAuthorizationFilter(apiAuthorizationAttribute.ApiScopeName));
                        }
                    }
                }
            }
        }
    }
}
