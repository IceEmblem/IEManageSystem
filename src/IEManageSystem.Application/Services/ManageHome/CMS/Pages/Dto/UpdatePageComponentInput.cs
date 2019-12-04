using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class UpdatePageComponentInput
    {
        public string Name { get; set; }

        public List<PageComponentDto> PageComponents { get; set; }
    }
}
