using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.Setting.SiteSettingQuerys.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.Setting.SiteSettingQuerys
{
    public interface ISiteSettingQueryAppService: IApplicationService
    {
        GetSiteSettingsOutput GetSiteSettings(GetSiteSettingsInput input);
    }
}
