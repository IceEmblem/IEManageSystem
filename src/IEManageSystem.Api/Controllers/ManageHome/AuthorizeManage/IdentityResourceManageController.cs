using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Models;
using IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages;
using IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage
{
    [Route("api/[controller]/[action]")]
    public class IdentityResourceManageController : IEManageSystemControllerBase
    {
        private IIdentityResourceManageAppService _IdentityResourceManageAppService { get; set; }

        public IdentityResourceManageController(
            IIdentityResourceManageAppService identityResourceManageAppService
            )
        {
            _IdentityResourceManageAppService = identityResourceManageAppService;
        }

        /// <summary>
        /// 获取身份资源列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<ApiResultDataModel<GetIdentityResourceOutput>>> GetIdentityResource(GetIdentityResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetIdentityResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetIdentityResourceOutput>(await _IdentityResourceManageAppService.GetIdentityResource(input));
        }
    }
}