using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.ComponentDatas
{
    public class DefaultComponentData : ComponentData
    {
        public PageBase Page { get; set; }

        [ForeignKey("Page")]
        public int? PageId { get; set; }
    }
}
