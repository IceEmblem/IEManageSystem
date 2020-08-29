using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.PageComponents;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(PageComponent))]
    public class PageComponentDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int ComponentTypes { get; set; }

        public string Sign { get; set; }

        public string ParentSign { get; set; }

        public PageComponentBaseSettingDto PageComponentBaseSetting { get; set; }

        public PageLeafSettingDto PageLeafSetting { get; set; }

        public string MenuName { get; set; }

        public List<PageComponentSettingDto> PageComponentSettings { get; set; }

        /// <summary>
        /// 组件的平台 
        /// </summary>
        public string OS { get; set; }
    }
}
