using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.PageComponents;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(PageComponentSetting))]
    public class PageComponentSettingDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public List<SingleSettingDataDto> SingleDatas { get; set; }
    }
}
