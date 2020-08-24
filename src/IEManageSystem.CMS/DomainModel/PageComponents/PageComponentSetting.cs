using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageComponents
{
    public class PageComponentSetting:Entity
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public ICollection<SingleSettingData> SingleDatas { get; set; }

        public PageComponentBase PageComponent { get; set; }

        [ForeignKey("PageComponent")]
        public int PageComponentId { get; set; }
    }
}
