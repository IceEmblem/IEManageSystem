using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Roles.Dto
{
    public class GetRolesOutput
    {
        public List<RoleDto> Roles { get; set; }

        public int ResourceNum { get; set; }

        public int PageIndex { get; set; }
    }
}
