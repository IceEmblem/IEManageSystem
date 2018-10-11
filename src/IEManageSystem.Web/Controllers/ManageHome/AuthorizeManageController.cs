using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Web.Controllers.ManageHome
{
    public class AuthorizeManageController : IEManageSystemControllerBase
    {
        public IActionResult IdentityResource()
        {
            return PartialView();
        }

        public ActionResult ApiResource()
        {
            return PartialView();
        }
    }
}