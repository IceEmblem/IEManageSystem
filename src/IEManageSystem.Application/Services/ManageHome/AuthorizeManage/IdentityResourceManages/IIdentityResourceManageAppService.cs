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
        Task<GetIdentityResourceOutput> GetIdentityResources(GetIdentityResourceInput input);

        Task<AddIdentityResourceOutput> AddIdentityResource(AddIdentityResourceInput input);

        Task<DeleteIdentityResourceOutput> DeleteIdentityResource(DeleteIdentityResourceInput input);

        Task<UpdateIdentityResourceOutput> UpdateIdentityResource(UpdateIdentityResourceInput input);
    }
}
