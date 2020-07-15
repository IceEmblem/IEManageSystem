using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Controllers.CMS.Pages.Dto
{
    public class GetPageDatasInput
    {
        [Range(1, 99999999)]
        public int PageIndex { get; set; }

        [Range(1, 99999999)]
        public int PageSize { get; set; }

        public int Top { get; set; }

        public string SearchKey { get; set; }

        public List<string> Tags { get; set; }

        public string Orderby { get; set; }

        public string PageName { get; set; }
    }
}
