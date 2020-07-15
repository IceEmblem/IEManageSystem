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
    public class ContentPagePermissionCollection : Entity
    {
        public bool IsEnableQueryPermission { get; set; }

        public ICollection<ContentPagePermission> ContentPagePermissions { get; set; }

        [ForeignKey("ContentPage")]
        public int ContentPageId { get; set; }

        public ContentPage ContentPage { get; set; }
        
        public bool IsCanManagePost(IEnumerable<Permission> permissions) 
        {
            foreach (var item in permissions) {
                if (ContentPagePermissions.Any(e => e.PermissionId == item.Id && e.IsManage == true)) {
                    return true;
                }
            }

            return false;
        }

        public bool IsCanQueryPost(IEnumerable<Permission> permissions) 
        {
            if (!IsEnableQueryPermission) {
                return true;
            }

            foreach (var item in permissions)
            {
                if (ContentPagePermissions.Any(e => e.PermissionId == item.Id))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
