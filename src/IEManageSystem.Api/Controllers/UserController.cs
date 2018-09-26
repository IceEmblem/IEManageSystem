using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Help.ClaimHelp;
using IEManageSystem.Api.Models;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.Services.Authorization.Users;
using IEManageSystem.Services.Authorization.Users.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : IEManageSystemControllerBase
    {
        private IUserAppService _UserAppService { get; set; }

        public UserController(
            IUserAppService userAppService
            )
        {
            _UserAppService = userAppService;
        }

        /// <summary>
        /// 获取身份信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<ApiResultDataModel<GetIdentityOutput>>> GetIdentity()
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetIdentityOutput>(_ValidateModelErrors);
            }

            IdentityUser identityUser = new ClaimHelper().CreateIdentityUserForClaims(User.Claims.ToList());


            return new ApiResultDataModel<GetIdentityOutput>(new GetIdentityOutput() { IdentityUser = identityUser });
        }
    }
}