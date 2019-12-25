using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.Setting.SiteSettings.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.Setting.SiteSettings
{
    public interface ISiteSettingManageAppService : IApplicationService
    {
        SetSiteSettingsOutput SetSiteSettings(SetSiteSettingsInput input);

        DeleteSiteSettingsOutput DeleteSiteSettings(DeleteSiteSettingsInput input);
    }
}
