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
        Task<GetUserInfoOutput> GetUserInfo(GetUserInfoInput input);

        Task<SetUserInfoOutput> SetUserInfo(SetUserInfoInput input);

        Task<SetSafetyProblemOutput> SetSafetyProblem(SetSafetyProblemInput input);
    }
}
