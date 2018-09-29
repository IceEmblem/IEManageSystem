using IEManageSystem.Dtos;
using IEManageSystem.Dtos.IdentityService;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages.Dto
{
    public class GetIdentityResourceOutput:OutputDtoBase
    {
        public List<IdentityResourceDto> IdentityResources { get; set; }
    }
}
