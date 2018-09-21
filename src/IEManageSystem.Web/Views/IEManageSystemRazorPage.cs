using Abp.AspNetCore.Mvc.Views;

namespace IEManageSystem.Web.Views
{
    public abstract class IEManageSystemRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected IEManageSystemRazorPage()
        {
            LocalizationSourceName = IEManageSystemConsts.LocalizationSourceName;
        }
    }
}
