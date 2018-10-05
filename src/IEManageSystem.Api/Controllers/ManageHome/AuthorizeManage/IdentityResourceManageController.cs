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
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetIdentityResourceOutput>>> GetIdentityResources([FromBody] GetIdentityResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetIdentityResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetIdentityResourceOutput>(await _IdentityResourceManageAppService.GetIdentityResources(input));
        }

        /// <summary>
        /// 添加身份资源
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult<ApiResultDataModel<AddIdentityResourceOutput>>> AddIdentityResource([FromBody] AddIdentityResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<AddIdentityResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<AddIdentityResourceOutput>(await _IdentityResourceManageAppService.AddIdentityResource(input));
        }

        /// <summary>
        /// 删除身份资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ActionResult<ApiResultDataModel<DeleteIdentityResourceOutput>>> DeleteIdentityResource([FromBody] DeleteIdentityResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<DeleteIdentityResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<DeleteIdentityResourceOutput>(await _IdentityResourceManageAppService.DeleteIdentityResource(input));
        }

        /// <summary>
        /// 更新身份资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ActionResult<ApiResultDataModel<UpdateIdentityResourceOutput>>> UpdateIdentityResource([FromBody] UpdateIdentityResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<UpdateIdentityResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<UpdateIdentityResourceOutput>(await _IdentityResourceManageAppService.UpdateIdentityResource(input));
        }
    }
}