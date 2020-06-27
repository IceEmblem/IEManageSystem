using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(ContentPagePermission))]
    public class ContentPagePermissionDto
    {
        public int Id { get; set; }

        public int PermissionId { get; set; }

        public bool IsManage { get; set; }
    }
}
