using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Middlewares
{
    public static class ExceptionHandleExMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionHandleEx(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandleExMiddleware>();
        }
    }
}
