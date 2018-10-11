using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages
{
    public interface IApiResourceManageAppService: IApplicationService
    {
        Task<GetApiResourceOutput> GetApiResources(GetApiResourceInput input);

        Task<AddApiResourceOutput> AddApiResource(AddApiResourceInput input);

        Task<DeleteApiResourceOutput> DeleteApiResource(DeleteApiResourceInput input);

        Task<UpdateApiResourceOutput> UpdateApiResource(UpdateApiResourceInput input);
    }
}
