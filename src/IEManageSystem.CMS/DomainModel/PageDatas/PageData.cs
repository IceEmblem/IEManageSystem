using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageDatas
{
    public class PageData:Entity
    {
        public string Name { get; set; }

        public string Title { get; set; }

        public ICollection<ContentComponentData> ContentComponentDatas { get; set; }

        public PageBase Page { get; set; }

        [ForeignKey("Page")]
        public int PageId { get; set; }
    }
}
