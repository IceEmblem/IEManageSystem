using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPageInput
    {
        /// <summary>
        /// 如果输入的是数值字符串，会试图转为PageId
        /// </summary>
        public string Name { get; set; }
    }
}
