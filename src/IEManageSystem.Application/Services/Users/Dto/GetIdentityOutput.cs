using IEManageSystem.Dtos;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.Users.Dto
{
    public class GetIdentityOutput: OutputDtoBase
    {
        public IdentityUser IdentityUser { get; set; }
    }
}
