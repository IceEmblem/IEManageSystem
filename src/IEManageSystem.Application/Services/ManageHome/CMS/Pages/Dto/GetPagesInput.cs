using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPagesInput
    {
        [Range(1, 99999999, ErrorMessage = "页大小必须大于0，且小于99999999")]
        public int PageIndex { get; set; }

        [Range(1, 99999999, ErrorMessage = "页大小必须大于0，且小于99999999")]
        public int PageSize { get; set; }

        public string SearchKey { get; set; }
    }
}
