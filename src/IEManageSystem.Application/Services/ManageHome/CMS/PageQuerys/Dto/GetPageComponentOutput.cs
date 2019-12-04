using IEManageSystem.Dtos;
using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto
{
    public class GetPageComponentOutput:OutputDtoBase
    {
        public List<PageComponentDto> PageComponents { get; set; }
    }
}
