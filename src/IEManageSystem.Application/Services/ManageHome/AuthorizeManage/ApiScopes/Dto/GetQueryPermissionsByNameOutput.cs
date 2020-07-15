using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto
{
    public class GetQueryPermissionsByNameOutput
    {
        public List<PermissionDto> Permissions { get; set; }
    }
}
