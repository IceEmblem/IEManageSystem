using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageComponents
{
    public class PageComponent:Entity
    {
        public PageComponent(string name) {
            Name = name;
        }

        public string Name { get; protected set; }

        public string Sign { get; set; }

        public string ParentSign { get; set; }

        public string MenuName { get; set; }

        public PageLeafSetting PageLeafSetting { get; set; }

        public ComponentOSType ComponentOSType { get; set; }

        public CmsComponent CmsComponent { get; set; }

        public PageComponentBaseSetting PageComponentBaseSetting { get; set; }

        public ICollection<PageComponentSetting> PageComponentSettings { get; set; }

        public PageBase Page { get; set; }

        [ForeignKey("Page")]
        public int PageId { get; set; }
    }
}
