using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Authorization;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.Authorization.Users.Dto
{
    public class GetIdentityOutput: OutputDtoBase
    {
        public IdentityUser IdentityUser { get; set; }
    }
}
