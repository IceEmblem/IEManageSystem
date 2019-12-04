using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto
{
    public class GetAdminRolesOutput:OutputDtoBase
    {
        public List<RoleDto> Roles { get; set; }
    }
}
