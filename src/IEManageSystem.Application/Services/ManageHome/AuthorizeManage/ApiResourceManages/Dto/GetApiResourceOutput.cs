using IdentityServer4.EntityFramework.Entities;
using IEManageSystem.Dtos;
using IEManageSystem.Dtos.IdentityService;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages.Dto
{
    public class GetApiResourceOutput:OutputDtoBase
    {
        public List<ApiResourceDto> ApiResources { get; set; }
    }
}
