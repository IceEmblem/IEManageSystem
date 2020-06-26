using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPageOutput
    {
        public PageDto Page { get; set; }

        public List<ComponentDataDto> DefaultComponentDatas { get; set; }
    }
}
