using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pictures.Dto
{
    public class DeletePictureInput
    {
        [Required]
        public string PicWebPath { get; set; }
    }
}
