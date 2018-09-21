using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Web.Controllers
{
    public class HomeController : IEManageSystemControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}