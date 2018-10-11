using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Models;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage
{
    [Route("api/[controller]/[action]")]
    public class ApiResourceManageController : IEManageSystemControllerBase
    {
        private IApiResourceManageAppService _apiResourceManageAppService { get; set; }

        public ApiResourceManageController(
            IApiResourceManageAppService apiResourceManageAppService
            )
        {
            _apiResourceManageAppService = apiResourceManageAppService;
        }

        /// <summary>
        /// 获取资源列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetApiResourceOutput>>> GetApiResources([FromBody] GetApiResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetApiResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetApiResourceOutput>( await _apiResourceManageAppService.GetApiResources(input));
        }

        /// <summary>
        /// 添加Api资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<AddApiResourceOutput>>> AddApiResource([FromBody] AddApiResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<AddApiResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<AddApiResourceOutput>(await _apiResourceManageAppService.AddApiResource(input));
        }

        /// <summary>
        /// 删除Api资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<DeleteApiResourceOutput>>> DeleteApiResource([FromBody] DeleteApiResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<DeleteApiResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<DeleteApiResourceOutput>(await _apiResourceManageAppService.DeleteApiResource(input));
        }

        /// <summary>
        /// 更新Api资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<UpdateApiResourceOutput>>> UpdateApiResource([FromBody] UpdateApiResourceInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<UpdateApiResourceOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<UpdateApiResourceOutput>(await _apiResourceManageAppService.UpdateApiResource(input));
        }
    }
}