using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages
{
    public interface IIdentityResourceManageAppService:IApplicationService
    {
        Task<GetIdentityResourceOutput> GetIdentityResource(GetIdentityResourceInput input);
    }
}
