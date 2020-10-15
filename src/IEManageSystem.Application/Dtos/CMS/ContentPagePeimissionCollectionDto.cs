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
        public bool IsEnableQueryPermission { get; set; }

        public string PageName { get; set; }

        public List<ContentPagePermissionDto> ContentPagePermissions { get; set; }
    }
}
