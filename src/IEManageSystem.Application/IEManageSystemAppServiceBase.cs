using Abp.Application.Services;

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