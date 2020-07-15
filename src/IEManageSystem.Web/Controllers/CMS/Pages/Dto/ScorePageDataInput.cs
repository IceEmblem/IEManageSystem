using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Controllers.CMS.Pages.Dto
{
    public class ScorePageDataInput
    {
        /// <summary>
        /// 当 PageName 为数值字符时，会试图当作页面Id进行处理
        /// </summary>
        public string PageName { get; set; }

        public string PageDataName { get; set; }

        public int Score { get; set; }
    }
}
