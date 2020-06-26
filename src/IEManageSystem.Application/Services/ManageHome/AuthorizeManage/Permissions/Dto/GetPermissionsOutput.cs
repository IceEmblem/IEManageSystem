using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions.Dto
{
    public class GetPermissionsOutput 
    {
        public List<PermissionDto> Permissions { get; set; }

        public int ResourceNum { get; set; }

        public int PageIndex { get; set; }
    }
}
