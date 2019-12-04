using Abp.Application.Services;
using Abp.Runtime.Validation;
using Abp.Web.Models;

namespace IEManageSystem
{
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class IEManageSystemAppServiceBase : ApplicationService
    {
        protected IEManageSystemAppServiceBase()
        {
            LocalizationSourceName = IEManageSystemConsts.LocalizationSourceName;
        }
    }
}