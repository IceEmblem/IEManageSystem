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

        public string PageName { get; set; }

        /// <summary>
        /// 是否可以管理该页面的文章，只有拥有管理权限才可以通过
        /// </summary>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public bool IsCanManagePost(IEnumerable<Permission> permissions) 
        {
            foreach (var item in permissions) {
                if (ContentPagePermissions.Any(e => e.PermissionId == item.Id && e.IsManage == true)) {
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// 是否可以访问该页面的文章，只有未只有查询权限或者用户拥有查询权限才可访问（拥有管理权限不行）
        /// </summary>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public bool IsCanQueryPost(IEnumerable<Permission> permissions) 
        {
            if (!IsEnableQueryPermission) {
                return true;
            }

            foreach (var item in permissions)
            {
                if (ContentPagePermissions.Any(e => e.PermissionId == item.Id && e.IsManage == false))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
