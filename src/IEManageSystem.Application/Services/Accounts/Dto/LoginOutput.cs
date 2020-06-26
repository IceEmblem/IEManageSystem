using IEManageSystem.Dtos;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.Accounts.Dto
{
    public class LoginOutput
    {
        public AbpLoginResult AbpLoginResult { get; set; }
    }
}
