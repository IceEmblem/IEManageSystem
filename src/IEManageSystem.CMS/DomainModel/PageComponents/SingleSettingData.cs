using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageComponents
{
    public class SingleSettingData : Entity, ISingleData
    {
        public string Name { get; set; }
        public int SortIndex { get; set; }
        public string Field1 { get; set; }
        public string Field2 { get; set; }
        public string Field3 { get; set; }
        public string Field4 { get; set; }
        public string Field5 { get; set; }

        [ForeignKey("PageComponent")]
        public int PageComponentSettingId { get; set; }

        public PageComponentSetting PageComponent { get; set; }
    }
}
