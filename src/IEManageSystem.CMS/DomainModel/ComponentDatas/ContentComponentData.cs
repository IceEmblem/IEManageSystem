using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.ComponentDatas
{
    public class ContentComponentData : ComponentData
    {
        public PageData PageData { get; set; }

        [ForeignKey("PageData")]
        public int? PageDataId { get; set; }
    }
}
