using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class UpdatePageInput
    {
        public PageDto Page { get; set; }

        // 整个页面完整 Json（包含页面组件，页面数据等）
        public string PageCompleteJson { get; set; }
    }
}
