using Abp.Dependency;
using Abp.Runtime.Session;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.Services;
using IEManageSystem.Services.Accounts;
using IEManageSystem.Services.Accounts.Dto;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.IdentityServerHelp
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            IHttpContextAccessor httpContextAccessor = IocManager.Instance.Resolve<IHttpContextAccessor>();
            string recvValidateCode = httpContextAccessor.HttpContext.Request.Form["VaildCode"];
            ValidateCodeHelper validateCodeHelper = IocManager.Instance.Resolve<ValidateCodeHelper>();
            string validateCode = validateCodeHelper.GetValidateCode();
            if (!string.Equals(validateCode, recvValidateCode, StringComparison.OrdinalIgnoreCase))
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "验证码错误");
                return;
            }
            AccountAppService accountAppService = IocManager.Instance.Resolve<AccountAppService>();

            IAbpSession abpSession = IocManager.Instance.Resolve<IAbpSession>();

            LoginInput input = new LoginInput();
            input.Username = context.UserName;
            input.Password = context.Password;
            input.TenantId = abpSession.TenantId;
            var output = await accountAppService.Login(input);
            if ( !output.IsSuccess() )
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, output.ErrorMessage);
                return;
            }
            var loginResult = output.AbpLoginResult;

            switch (loginResult.Result)
            {
                case AbpLoginResultType.Success:
                    IdentityUser user = loginResult.User;
                    context.Result = new GrantValidationResult(
                        subject: context.UserName,
                        authenticationMethod: "custom",
                        claims: new Claim[]
                        {
                            new Claim("Id", user.Id.ToString()),
                            new Claim("UserName", user.UserName),
                            new Claim("EmailAddress", user.EmailAddress),
                            new Claim("Name", user.Name),
                        }
                    );
                    break;
                case AbpLoginResultType.InvalidUserNameOrEmailAddress:
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "不存在的用户名");
                    break;
                case AbpLoginResultType.InvalidPassword:
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "密码错误");
                    break;
                default:
                    //验证失败
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "身份验证失败");
                    break;
            }
        }
    }
}
