using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageDatas
{
    public class Tag : Entity 
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        [ForeignKey("PageDataId")]
        public PageData PageData { get; set; }

        public int PageDataId { get; set; }
    }
}
