using Abp.AutoMapper;
using IEManageSystem.Common.DomainModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Common
{
    [AutoMap(typeof(SiteSetting))]
    public class SiteSettingDto
    {
        public int Id { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }

        public string DisplayName { get; set; }

        public string Group { get; set; }
    }
}
