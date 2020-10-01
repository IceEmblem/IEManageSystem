using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Tests.TestDatas
{
    public class ContentPagePermissionCollectionBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public ContentPagePermissionCollectionBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var permission = _context.Permissions.FirstOrDefault(e => e.Name == "Permission1");

            _context.ContentPagePermissionCollections.Add(new CMS.DomainModel.Pages.ContentPagePermissionCollection()
            {
                IsEnableQueryPermission = true,
                ContentPagePermissions = new List<ContentPagePermission>() {
                        new ContentPagePermission(){ Permission = permission, IsManage = false },
                        new ContentPagePermission(){ Permission = permission, IsManage = true }
                },
                PageName = "ContentPage1Name"
            });
        }
    }
}
