using System.Threading.Tasks;
using Abp.Application.Services;
using IEManageSystem.Services.Authorization.Accounts.Dto;

namespace IEManageSystem.Services.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<RegisterOutput> Register(RegisterInput input);

        Task<LoginOutput> Login(LoginInput input);
    }
}
