using Abp.Domain.Entities;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class ContentPagePermission : Entity
    {
        [ForeignKey("Permission")]
        public int PermissionId { get; set; }

        public Permission Permission { get; set; }
    }
}
