using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.Setting.SiteSettings.Dto
{
    public class GetSiteSettingsOutput: OutputDtoBase
    {
        public List<SiteSettingDto> SiteSettings { get; set; }
    }
}
