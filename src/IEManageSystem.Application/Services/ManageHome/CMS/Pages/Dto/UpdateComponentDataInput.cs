using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class UpdateComponentDataInput
    {
        public string PageName { get; set; }

        public string PageDataName { get; set; }

        public List<ContentComponentDataDto> ComponentDatas { get; set; }
    }
}
