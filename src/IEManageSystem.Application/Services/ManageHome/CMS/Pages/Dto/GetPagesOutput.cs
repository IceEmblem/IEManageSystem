using IEManageSystem.Dtos;
using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPagesOutput
    {
        public List<PageDto> Pages { get; set; }

        public int ResourceNum { get; set; }

        public int PageIndex { get; set; }
    }
}
