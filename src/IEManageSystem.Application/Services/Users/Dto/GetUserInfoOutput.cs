using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core.Users;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.Users.Dto
{
    public class GetUserInfoOutput
    {
        public UserDto User { get; set; }
    }
}
