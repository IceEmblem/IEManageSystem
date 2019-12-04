using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.Runtime.Session;
using Abp.UI;
using IdentityModel;
using IdentityModel.Client;
using IEManageSystem.Api.Configuration;
using IEManageSystem.Api.Help;
using IEManageSystem.Api.Models;
using IEManageSystem.Api.Models.AccountModels;
using IEManageSystem.Entitys.Authorization.Identitys;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.JwtAuthentication;
using IEManageSystem.JwtAuthentication.Model;
using IEManageSystem.Services.Accounts;
using IEManageSystem.Services.Accounts.Dto;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using UtilityAction.ValidateFun;

namespace IEManageSystem.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : IEManageSystemControllerBase
    {
        private AccountAppService _AccountAppService { get; set; }

        private IAbpSession _AbpSession { get; set; }

        private JwtTokenHandler _JwtTokenHandler { get; set; }

        public AccountController(
            AccountAppService accountAppService,
            IAbpSession abpSession,
            JwtTokenHandler jwtTokenHandler)
        {

            _AccountAppService = accountAppService;

            _AbpSession = abpSession;

            _JwtTokenHandler = jwtTokenHandler;
        }

        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<RegisterOutput>> RegisterAsync([FromBody] RegisterApiModel model)
        {
            RegisterInput input = new RegisterInput();
            input.Name = model.AccountID;
            input.Surname = model.AccountID;
            input.UserName = model.AccountID;
            input.Password = model.Password;
            input.TenantId = _AbpSession.TenantId;

            RegisterOutput output = await _AccountAppService.Register(input);

            return output;
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<object>> LoginAsync([FromBody] LoginApiModel model)
        {
            LoginInput input = new LoginInput() {
                Username = model.AccountID,
                Password = model.Password,
                TenantId = _AbpSession.TenantId,
            };
            var output = await _AccountAppService.Login(input);

            if (output.AbpLoginResult.Result == AbpLoginResultType.InvalidUserNameOrEmailAddress) {
                throw new UserFriendlyException("用户名或密码错误");
            }

            if (output.AbpLoginResult.Result == AbpLoginResultType.InvalidPassword) {
                throw new UserFriendlyException("密码错误");
            }

            IdentityUser user = output.AbpLoginResult.User;

            UserClaimInfo userClaimInfo = new UserClaimInfo(user.Id.ToString(), user.Permissions)
            {
                Name = user.Name,
                UserName = user.UserName
            };

            string jwtToken = _JwtTokenHandler.CreateToken(userClaimInfo, WebConfiguration.SymmetricKey);

            return new
            {
                access_token = jwtToken,
                token_type = "Bearer"
            };
        }
    }
}