using IEManageSystem.Dtos;
using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pictures.Dto
{
    public class GetFileAndDirsOutput
    {
        public List<PictureDto> Pictures { get; set; }
    }
}
