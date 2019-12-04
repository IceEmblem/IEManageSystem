using IEManageSystem.Dtos;
using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto
{
    public class GetPageDatasOutput:OutputDtoBase
    {
        public List<PageDataDto> PageDatas { get; set; }

        public int ResourceNum { get; set; }

        public int PageIndex { get; set; }
    }
}
