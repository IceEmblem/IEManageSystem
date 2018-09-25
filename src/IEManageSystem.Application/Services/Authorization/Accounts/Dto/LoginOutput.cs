using IEManageSystem.Dtos;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.Authorization.Accounts.Dto
{
    public class LoginOutput:OutputDtoBase
    {
        public AbpLoginResult AbpLoginResult { get; set; }
    }
}
