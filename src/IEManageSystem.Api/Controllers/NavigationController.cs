using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Navigation;
using IEManageSystem.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class NavigationController : IEManageSystemControllerBase
    {
        private readonly IUserNavigationManager _userNavigationManager;

        public NavigationController(
            IUserNavigationManager userNavigationManager
            )
        {
            _userNavigationManager = userNavigationManager;
        }

        /// <summary>
        /// 获取导航栏
        /// </summary>
        /// <param name="NavigationName"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<ApiResultDataModel>> GetNavigationForName(string NavigationName)
        {
            return new ApiResultDataModel() { IsSuccess = true, Value = await _userNavigationManager.GetMenuAsync(NavigationName, null) };
        }
    }
}