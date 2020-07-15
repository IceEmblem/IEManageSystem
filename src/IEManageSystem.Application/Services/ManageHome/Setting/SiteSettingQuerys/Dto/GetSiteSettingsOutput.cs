using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.Setting.SiteSettingQuerys.Dto
{
    public class GetSiteSettingsOutput
    {
        public List<SiteSettingDto> SiteSettings { get; set; }
    }
}
