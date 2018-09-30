using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Help.ClaimHelp;
using IEManageSystem.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage
{
    [Route("api/[controller]/[action]")]
    public class ClaimManageController : IEManageSystemControllerBase
    {
        private ClaimHelper _claimHelper { get; set; }

        public ClaimManageController(
            ClaimHelper claimHelper
            )
        {
            _claimHelper = claimHelper;
        }

        /// <summary>
        /// 获取站点Claim类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<ApiResultDataModel>> GetWebClaimTypes()
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel(_ValidateModelErrors);
            }

            return new ApiResultDataModel() {
                IsSuccess = true,
                Value = _claimHelper.GetWebClaimTypes(),
            };
        }
    }
}