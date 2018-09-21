using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Authorization;
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
