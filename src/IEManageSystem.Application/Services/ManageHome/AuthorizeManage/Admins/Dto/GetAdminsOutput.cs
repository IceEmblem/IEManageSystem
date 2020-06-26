using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core.Users;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto
{
    public class GetAdminsOutput
    {
        public List<UserDto> Admins { get; set; }

        public int ResourceNum { get; set; }

        public int PageIndex { get; set; }
    }
}
