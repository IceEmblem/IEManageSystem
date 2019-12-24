using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Common.DomainModel
{
    // 站点设置
    public class SiteSetting:Entity
    {
        public string Key { get; set; }

        public string Value { get; set; }

        public string DisplayeName { get; set; }

        public string Group { get; set; }
    }
}
