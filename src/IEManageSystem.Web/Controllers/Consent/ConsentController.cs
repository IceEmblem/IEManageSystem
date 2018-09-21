// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Controllers.Consent
{
    /// <summary>
    /// This controller processes the consent UI
    /// </summary>
    //[Authorize]
    public class ConsentController : IEManageSystemControllerBase
    {
        /// <summary>
        /// 显示同意页面
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Index(string returnUrl)
        {
            return View("Index");
        }
    }
}