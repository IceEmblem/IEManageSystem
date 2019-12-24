using IEManageSystem.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.Setting.SiteSettings.Dto
{
    public class DeleteSiteSettingsInput
    {
        public List<SiteSettingDto> SiteSettings { get; set; }
    }
}
