using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class UpdateContentPagePermissionInput
    {
        public string Name { get; set; }

        public ContentPagePeimissionCollectionDto ContentPagePeimissionCollection;
    }
}
