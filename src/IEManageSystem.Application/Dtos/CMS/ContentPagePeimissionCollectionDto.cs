using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(ContentPagePermissionCollection))]
    public class ContentPagePeimissionCollectionDto
    {
        public List<ContentPagePermissionDto> ManagePermissions { get; set; }

        public bool IsEnableQueryPermission { get; set; }

        public List<ContentPagePermissionDto> QueryPermissions { get; set; }
    }
}
