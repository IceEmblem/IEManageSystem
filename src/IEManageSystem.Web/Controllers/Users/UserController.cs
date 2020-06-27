using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Web.Controllers.Users.Dto;
using IEManageSystem.Web.Models;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.JwtAuthentication;
using IEManageSystem.JwtAuthentication.Model;
using IEManageSystem.Services.Users;
using IEManageSystem.Services.Users.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace IEManageSystem.Web.Controllers.Users
{
    [Route("api/[controller]/[action]")]
    public class UserController : IEManageSystemControllerBase
    {
        private ApiScopeManager _apiScopeManager { get; set; }

        private ClaimManager _claimManager { get; set; }

        public UserController(
            ApiScopeManager apiScopeManager,
            ClaimManager claimManager
            )
        {
            _apiScopeManager = apiScopeManager;
            _claimManager = claimManager;
        }

        /// <summary>
        /// 获取当前用户可以访问的域
        /// 该函数需要访问Claim，因此不能迁移到应用层
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<GetUserScopeAccessAuthoritiesOutput> GetUserScopeAccessAuthorities([FromBody]GetUserScopeAccessAuthoritiesInput input)
        {
            IEnumerable<string> permissionNames = _claimManager.GetPermissionsForClaims(User.Claims);

            var userScopeAccessAuthorities = _apiScopeManager.GetUserScopeAccessAuthorities(permissionNames);

            return new GetUserScopeAccessAuthoritiesOutput() { UserScopeAccessAuthoritys = userScopeAccessAuthorities };
        }
    }
}