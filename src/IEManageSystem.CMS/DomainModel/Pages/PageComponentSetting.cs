using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class PageComponentSetting:Entity
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Field1 { get; set; }

        public string Field2 { get; set; }

        public string Field3 { get; set; }

        public string Field4 { get; set; }

        public string Field5 { get; set; }

        protected PageComponentBase PageComponent { get; set; }

        [ForeignKey("PageComponent")]
        protected int PageComponentId { get; set; }
    }
}
