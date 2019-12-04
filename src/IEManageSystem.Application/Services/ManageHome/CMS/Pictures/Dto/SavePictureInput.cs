using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pictures.Dto
{
    public class SavePictureInput
    {
        [Required]
        public string PicWebPath { get; set; }

        [Required]
        public string Base64Image { get; set; }
    }
}
