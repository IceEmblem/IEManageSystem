using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(PageComponentBaseSetting))]
    public class PageComponentBaseSettingDto
    {
        public int Id { get; set; }

        public int SortIndex { get; set; }

        public string Col { get; set; }

        public string Height { get; set; }

        public string Padding { get; set; }

        public string Margin { get; set; }

        public string BackgroundColor { get; set; }

        public string ClassName { get; set; }
    }
}
