using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto
{
    public class GetManagePermissionsOutput:OutputDtoBase
    {
        public List<PermissionDto> Permissions { get; set; }
    }
}
