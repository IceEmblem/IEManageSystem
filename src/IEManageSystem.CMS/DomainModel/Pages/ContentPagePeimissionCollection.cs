using Abp.Domain.Entities;
using Abp.Domain.Values;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class ContentPagePeimissionCollection : Entity
    {

        public ICollection<ContentPagePermission> ManagePermissions { get; set; }

        public bool IsEnableQueryPermission { get; set; }

        public ICollection<ContentPagePermission> QueryPermissions { get; set; }

        public int ContentPageId { get; set; }

        [ForeignKey("ContentPageId")]
        public ContentPage ContentPage { get; set; }

        public bool IsCanManagePost(Permission permission) 
        {
            return ManagePermissions.Any(e => e.PermissionId == permission.Id);
        }

        public bool IsCanQueryPost(Permission permission) 
        {
            if (!IsEnableQueryPermission) {
                return true;
            }

            return ManagePermissions.Any(e => e.PermissionId == permission.Id) || QueryPermissions.Any(e => e.PermissionId == permission.Id);
        }
    }
}
