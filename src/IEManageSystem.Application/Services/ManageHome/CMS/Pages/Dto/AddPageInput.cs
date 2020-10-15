using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class AddPageInput
    {
        public PageDto Page { get; set; }

        public string PageCompleteJson { get; set; }
    }
}
