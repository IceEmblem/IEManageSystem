using Abp.Application.Services;
using IEManageSystem.Services.Authorization.Users.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.Authorization.Users
{
    public interface IUserAppService:IApplicationService
    {
        Task<GetIdentityOutput> GetIdentity(GetIdentityInput input);
    }
}
