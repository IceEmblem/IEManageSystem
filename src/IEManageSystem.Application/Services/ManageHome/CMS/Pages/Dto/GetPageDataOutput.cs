using IEManageSystem.Dtos;
using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPageDataOutput : OutputDtoBase
    {
        public PageDataDto PageData { get; set; }

        public List<ComponentDataDto> ContentComponentDatas { get; set; }
    }
}
