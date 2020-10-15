using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPageDataInput
    {
        /// <summary>
        /// 当 PageName 为数值字符时，会试图当作页面Id进行处理
        /// </summary>
        public string PageName { get; set; }

        public string PageDataName { get; set; }

        /// <summary>
        /// 如果为 true，则会检查当前者的身份是否为创造者
        /// </summary>
        public bool IsCheckCreator { get; set; }
    }
}
