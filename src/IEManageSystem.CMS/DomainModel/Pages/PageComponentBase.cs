using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public abstract class PageComponentBase:Entity
    {
        public PageComponentBase(string name) {
            Name = name;
        }

        public string Name { get; protected set; }

        public string Sign { get; set; }

        public string ParentSign { get; set; }

        public int SortIndex { get; set; }

        public string Col { get; set; }

        public string Height { get; set; }

        public string Padding { get; set; }

        public string Margin { get; set; }

        public string BackgroundColor { get; set; }

        public string ClassName { get; set; }

        public CmsComponent CmsComponent { get; set; }

        public ICollection<PageComponentSetting> PageComponentSettings { get; set; }

        public PageBase Page { get; set; }

        [ForeignKey("Page")]
        public int PageId { get; set; }
    }
}
