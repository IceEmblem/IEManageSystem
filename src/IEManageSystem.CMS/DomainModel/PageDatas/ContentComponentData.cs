using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageDatas
{
    public class ContentComponentData:Entity
    {
        /// <summary>
        /// 组件标识
        /// </summary>
        public string Sign { get; set; }

        public string Field1 { get; set; }

        public string Field2 { get; set; }

        public string Field3 { get; set; }

        public string Field4 { get; set; }

        public string Field5 { get; set; }

        public PageData PageData { get; set; }

        [ForeignKey("PageData")]
        public int PageDataId { get; set; }
    }
}
