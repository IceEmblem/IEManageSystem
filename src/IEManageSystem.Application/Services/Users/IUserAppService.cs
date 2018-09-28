using Abp.Application.Services;
using IEManageSystem.Services.Users.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.Users
{
    public interface IUserAppService:IApplicationService
    {
        Task<GetIdentityOutput> GetIdentity(GetIdentityInput input);
    }
}
