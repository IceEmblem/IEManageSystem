using Abp.AspNetCore.Mvc.Controllers;

namespace IEManageSystem.Web.Controllers
{
    public abstract class IEManageSystemControllerBase: AbpController
    {
        protected IEManageSystemControllerBase()
        {
            LocalizationSourceName = IEManageSystemConsts.LocalizationSourceName;
        }
    }
}