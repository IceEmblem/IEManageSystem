using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageDatas
{
    public class PageData:Entity, IHasCreationTime
    {
        public string Name { get; set; }

        public string Title { get; set; }

        public string Describe { get; set; }

        public string Content { get; set; }

        public string Images { get; set; }

        [Range(0, 10)]
        public int Score { get; set; }

        /// <summary>
        /// 点击量
        /// </summary>
        public int Click { get; set; }

        public DateTime CreationTime { get; set; }

        public PageBase Page { get; set; }

        [ForeignKey("Page")]
        public int PageId { get; set; }

        public ICollection<Tag> Tags { get; set; }
    }
}
