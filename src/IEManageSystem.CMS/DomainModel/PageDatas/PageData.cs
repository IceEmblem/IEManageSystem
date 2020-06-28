using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageDatas
{
    public class PageData:Entity
    {
        public string Name { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Tags { get; set; }

        public string Images { get; set; }

        public PageBase Page { get; set; }

        [ForeignKey("Page")]
        public int PageId { get; set; }
    }
}
