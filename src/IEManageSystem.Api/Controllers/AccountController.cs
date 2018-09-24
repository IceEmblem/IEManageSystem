using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.Runtime.Session;
using IdentityModel.Client;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IEManageSystem.Api.Help;
using IEManageSystem.Api.Models;
using IEManageSystem.Api.Models.AccountModels;
using IEManageSystem.Dtos.Authorization;
using IEManageSystem.Services.Authorization.Accounts;
using IEManageSystem.Services.Authorization.Accounts.Dto;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UtilityAction.ValidateFun;

namespace IEManageSystem.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : IEManageSystemControllerBase
    {
        private readonly IEventService _Events;

        private readonly IIdentityServerInteractionService _Interaction;

        private ValidateCodeHelper _ValidateCodeHelper { get; set; }

        private AccountAppService _AccountAppService { get; set; }

        private IAbpSession _AbpSession { get; set; }

        public AccountController(
            IEventService events,
            IIdentityServerInteractionService interaction,
            ValidateCodeHelper validateCodeHelper,
            AccountAppService accountAppService,
            IAbpSession abpSession)
        {
            _Events = events;

            _Interaction = interaction;

            _ValidateCodeHelper = validateCodeHelper;

            _AccountAppService = accountAppService;

            _AbpSession = abpSession;
        }

        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<RegisterOutput>>> RegisterAsync([FromBody] RegisterApiModel model)
        {
            if (ValidateModel() == false) {
                return new ApiResultDataModel<RegisterOutput>(_ValidateModelErrors);
            }

            string validateCode = _ValidateCodeHelper.GetValidateCode();
            if (!string.Equals(validateCode, model.VaildCode, StringComparison.OrdinalIgnoreCase))
            {
                return new ApiResultDataModel<RegisterOutput>() { IsSuccess = false, Message = "验证码错误" };
            }

            RegisterOutput output;

            RegisterInput input = new RegisterInput();
            input.Name = model.AccountID;
            input.Surname = model.AccountID;
            input.UserName = model.AccountID;
            input.Password = model.Password;
            input.EmailAddress = model.Email;
            input.TenantId = _AbpSession.TenantId;

            output = await _AccountAppService.Register(input);

            return new ApiResultDataModel<RegisterOutput>(output);
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel>> LoginAsync([FromBody] LoginApiModel model)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel(_ValidateModelErrors);
            }

            string validateCode = _ValidateCodeHelper.GetValidateCode();
            if (!string.Equals(validateCode, model.VaildCode, StringComparison.OrdinalIgnoreCase))
            {
                return new ApiResultDataModel() { IsSuccess = false, Message = "验证码错误" };
            }

            LoginInput input = new LoginInput();
            input.Username = model.AccountID;
            input.Password = model.Password;
            input.TenantId = _AbpSession.TenantId;
            var output = await _AccountAppService.Login(input);

            switch (output.AbpLoginResult.Result)
            {
                case AbpLoginResultType.Success:

                    var user = output.AbpLoginResult.User;
                    // 触发用户登录成功事件
                    await _Events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.UserName, user.UserName));

                    // 如果用户选择“记住我”，则仅在此设置明确的到期时间。
                    // 否则我们依赖于cookie中间件中配置的到期。
                    // AuthenticationProperties用于存储有关身份验证会话的状态值的字典。
                    AuthenticationProperties props = null;
                    if (model.RememberLogin)
                    {
                        props = new AuthenticationProperties
                        {
                            IsPersistent = true,
                            ExpiresUtc = DateTimeOffset.UtcNow.Add(TimeSpan.FromDays(15))
                        };
                    };

                    var claims = new Claim[]
                        {
                            new Claim("Id", user.Id.ToString()),
                            new Claim("UserName", user.UserName),
                            new Claim("EmailAddress", user.EmailAddress),
                            new Claim("Name", user.Name),
                            new Claim("Phone", user.Phone ?? ""),
                        };

                    // 使用主题ID和用户名发出身份验证Cookie
                    await HttpContext.SignInAsync(user.UserName, user.UserName, props, claims);

                    var result = new ApiResultDataModel() { IsSuccess = true, Value = null };

                    // result.RedirectHref = request.RedirectUri;
                    // 确保returnUrl仍然有效，如果是这样重定向回授权端点或本地页面，只有当你想支持其他本地页面时才需要进行IsLocalUrl检查，否则IsValidReturnUrl会更严格
                    if (_Interaction.IsValidReturnUrl(model.ReturnUrl) || Url.IsLocalUrl(model.ReturnUrl))
                    {
                        result.RedirectHref = model.ReturnUrl;
                    }
                    //else
                    //{
                    //    result.RedirectHref = "/";
                    //}

                    return result;

                case AbpLoginResultType.InvalidPassword:
                    return new ApiResultDataModel() { IsSuccess = false, Message = "密码错误" };

                case AbpLoginResultType.InvalidUserNameOrEmailAddress:
                    return new ApiResultDataModel() { IsSuccess = false, Message = "用户名或密码错误" };
            }

            return new ApiResultDataModel() { IsSuccess = false, Value = null };
        }

        /// <summary>
        /// 退出登录
        /// </summary>
        /// <param name="logoutId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            var context = await _Interaction.GetLogoutContextAsync(logoutId);

            if (User?.Identity.IsAuthenticated == true)
            {
                // delete local authentication cookie
                await HttpContext.SignOutAsync();

                // raise the logout event
                await _Events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));
            }

            var logout = await _Interaction.GetLogoutContextAsync(logoutId);

            return Redirect(logout?.PostLogoutRedirectUri);
        }

        /// <summary>
        /// 获取验证码
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetVerificationCode()
        {
            System.IO.MemoryStream ms = _ValidateCodeHelper.CreateValidateCode();
            Response.Body.Dispose();

            return File(ms.ToArray(), @"image/png");
        }
    }
}