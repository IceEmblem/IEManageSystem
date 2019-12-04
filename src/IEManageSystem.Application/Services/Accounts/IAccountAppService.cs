using System.Threading.Tasks;
using Abp.Application.Services;
using IEManageSystem.Services.Accounts.Dto;

namespace IEManageSystem.Services.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<RegisterOutput> Register(RegisterInput input);

        Task<LoginOutput> Login(LoginInput input);
    }
}
