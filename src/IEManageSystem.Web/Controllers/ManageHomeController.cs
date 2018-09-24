using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Navigation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Web.Controllers
{
    [Authorize]
    public class ManageHomeController : IEManageSystemControllerBase
    {
        public IActionResult Index()
        {
            ViewData["ManageHomeMenu"] = "ManageHomeMenu";

            return View();
        }
    }
}