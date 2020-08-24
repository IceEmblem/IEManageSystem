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

        public PageLeafSettingDto PageLeafSetting { get; set; }

        public string MenuName { get; set; }

        public List<PageComponentSettingDto> PageComponentSettings { get; set; }

        /// <summary>
        /// 组件的平台 
        /// </summary>
        public string OS { get; set; }

        /// <summary>
        /// 组件类型 CompositeComponent, LeafComponent, PageLeafComponent, MenuComponent
        /// </summary>
        public string ComponentType { get; set; }

        public void SetCompositeComponentType() => ComponentType = "CompositeComponent";
        public bool IsCompositeComponentType() => ComponentType == "CompositeComponent";

        public void SetLeafComponentType() => ComponentType = "LeafComponent";
        public bool IsLeafComponentType() => ComponentType == "LeafComponent";

        public void SetPageLeafComponentType() => ComponentType = "PageLeafComponent";
        public bool IsPageLeafComponentType() => ComponentType == "PageLeafComponent";

        public void SetMenuComponentType() => ComponentType = "MenuComponent";
        public bool IsMenuComponentType() => ComponentType == "MenuComponent";
    }
}
