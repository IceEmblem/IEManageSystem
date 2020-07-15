using IEManageSystem.Dtos;
using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPageDatasOutput
    {
        public List<PageDataDto> PageDatas { get; set; }

        public int ResourceNum { get; set; }

        public int PageIndex { get; set; }
    }
}
