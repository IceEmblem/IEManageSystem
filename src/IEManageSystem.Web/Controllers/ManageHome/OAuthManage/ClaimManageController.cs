using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Controllers.ManageHome.OAuthManage.Dto;
using IEManageSystem.Api.Models;
using IEManageSystem.JwtAuthentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.OAuthManage
{
    [Route("api/[controller]/[action]")]
    public class ClaimManageController : IEManageSystemControllerBase
    {
        private JwtTokenHandler _jwtTokenHandler { get; set; }

        public ClaimManageController(
            JwtTokenHandler claimManager
            )
        {
            _jwtTokenHandler = claimManager;
        }

        /// <summary>
        /// 获取站点Claim类型
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<GetWebClaimTypesOutput>> GetWebClaimTypes(GetWebClaimTypesInput input)
        {
            return new GetWebClaimTypesOutput()
            {
                WebClaimTypes = _jwtTokenHandler.GetTokenClaimTypes()
            };
        }
    }
}