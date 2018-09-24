using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServer4.Test;
using IEManageSystem.Web.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Web.Controllers
{
    public class AccountController : IEManageSystemControllerBase
    {
        public AccountController()
        {
        }

        public IActionResult Login()
        {
            ViewData["ManageHomeUrl"] = SiteUrlConguration.ManageHome;

            return View();
        }

        /// <summary>
        /// Show logout page
        /// </summary>
        [HttpGet]
        public IActionResult Logout(string logoutId)
        {
            string url = "/api" + HttpContext.Request.Path.Value + HttpContext.Request.QueryString.Value;

            return Redirect(url);
        }
    }
}