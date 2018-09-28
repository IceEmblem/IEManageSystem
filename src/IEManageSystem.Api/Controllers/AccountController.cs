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
using IEManageSystem.Api.Help.ClaimHelp;
using IEManageSystem.Api.Models;
using IEManageSystem.Api.Models.AccountModels;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.Services.Accounts;
using IEManageSystem.Services.Accounts.Dto;
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

            // 验证验证码
            string validateCode = _ValidateCodeHelper.GetValidateCode();
            if (!string.Equals(validateCode, model.VaildCode, StringComparison.OrdinalIgnoreCase))
            {
                return new ApiResultDataModel() { IsSuccess = false, Message = "验证码错误" };
            }

            LoginInput input = new LoginInput() {
                Username = model.AccountID,
                Password = model.Password,
                TenantId = _AbpSession.TenantId,
            };
            var output = await _AccountAppService.Login(input);

            if (output.AbpLoginResult.Result == AbpLoginResultType.InvalidUserNameOrEmailAddress) {
                return new ApiResultDataModel() { IsSuccess = false, Message = "用户名或密码错误" };
            }

            if (output.AbpLoginResult.Result == AbpLoginResultType.InvalidPassword) {
                return new ApiResultDataModel() { IsSuccess = false, Message = "密码错误" };
            }

            await SignInAsync(output.AbpLoginResult.User, model.RememberLogin);

            // 确保returnUrl仍然有效，如果是这样重定向回授权端点或本地页面，只有当你想支持其他本地页面时才需要进行IsLocalUrl检查，否则IsValidReturnUrl会更严格
            if (_Interaction.IsValidReturnUrl(model.ReturnUrl) || Url.IsLocalUrl(model.ReturnUrl))
            {
                return new ApiResultDataModel()
                {
                    IsSuccess = true,
                    RedirectHref = model.ReturnUrl,
                };
            }

            return new ApiResultDataModel() { IsSuccess = true };
        }

        /// <summary>
        /// 执行站点登录
        /// </summary>
        /// <returns></returns>
        private async Task SignInAsync(IdentityUser user, bool rememberLogin)
        {
            // 触发IdentityService用户登录成功事件
            await _Events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id.ToString(), user.Name));

            // 如果用户选择“记住我”，则仅在此设置明确的到期时间。
            AuthenticationProperties props = null;
            if (rememberLogin)
            {
                props = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.Add(TimeSpan.FromDays(15))
                };
            };
            var claims = new ClaimHelper().CreateClaimsForIdentityUser(user).ToArray();

            // 发出身份验证Cookie
            await HttpContext.SignInAsync(user.Id.ToString(), user.Name, props, claims);
        }

        /// <summary>
        /// 退出登录
        /// </summary>
        /// <param name="logoutId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<ApiResultDataModel>> Logout(string logoutId)
        {
            var logout = await _Interaction.GetLogoutContextAsync(logoutId);

            if (User?.Identity.IsAuthenticated == true)
            {
                // delete local authentication cookie
                await HttpContext.SignOutAsync();

                // raise the logout event
                await _Events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));
            }

            // logoutId 为空则为本站点退出登录
            if (string.IsNullOrEmpty(logoutId) || string.IsNullOrEmpty(logout?.ClientId))
            {
                return new ApiResultDataModel() {
                    IsSuccess = true,
                    RedirectHref = HttpContext.Request.Headers["Referer"],
                };
            }

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