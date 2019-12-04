using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using System.Linq.Expressions;
using Abp.Domain.Uow;
using IEManageSystem.JwtAuthentication.Model;

namespace IEManageSystem.JwtAuthentication.Authorizations
{
    public class IEAuthorizationPolicy : AuthorizationHandler<IEAuthorizationRequirement>
    {
        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        public IEAuthorizationPolicy(
            IUnitOfWorkManager unitOfWorkManager)
        {
            _unitOfWorkManager = unitOfWorkManager;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IEAuthorizationRequirement requirement)
        {
            using (var unitOfWork = _unitOfWorkManager.Begin())
            {
                if (context.User == null)
                {
                    return Task.CompletedTask;
                }

                if (!context.User.HasClaim(c => c.Type == JwtClaimType.Permission))
                {
                    return Task.CompletedTask;
                }

                // 获取当前用户拥有的权限
                List<Claim> permissionClaims = context.User.Claims.Where(e => e.Type == JwtClaimType.Permission).ToList();

                if(requirement.IsAllowAccess(permissionClaims.Select(e => e.Value)))
                {
                    // 授权通过
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }

            return Task.CompletedTask;
        }
    }
}
