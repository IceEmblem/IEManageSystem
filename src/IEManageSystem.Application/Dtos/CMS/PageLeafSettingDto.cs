using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(PageLeafSetting))]
    public class PageLeafSettingDto
    {
        public string PageName { get; set; }

        public int PageSize { get; set; }

        public int Top { get; set; }

        public string SearchKey { get; set; }
    }
}
