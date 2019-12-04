using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Roles.Dto
{
    public class GetPermissionsOutput:OutputDtoBase
    {
        public List<PermissionDto> Permissions { get; set; }
    }
}
