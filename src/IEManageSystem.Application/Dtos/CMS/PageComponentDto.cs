using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    //[AutoMap()]
    public class PageComponentDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Sign { get; set; }

        public string ParentSign { get; set; }

        public PageComponentBaseSettingDto PageComponentBaseSetting { get; set; }

        public int? TargetPageId { get; set; }

        /// <summary>
        /// CompositeComponent, LeafComponent, PageLeafComponent
        /// </summary>
        public string ComponentType { get; set; }

        public List<PageComponentSettingDto> PageComponentSettings { get; set; }
    }
}
