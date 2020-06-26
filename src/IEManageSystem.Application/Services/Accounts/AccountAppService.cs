using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Services.Accounts.Dto;

namespace IEManageSystem.Services.Accounts
{
    [RemoteService(false)]
    public class AccountAppService : IEManageSystemAppServiceBase, IAccountAppService
    {
        private IAbpSession _AbpSession { get; set; }

        private LoginManager _LoginManager { get; set; }

        private RegisterManager _UserManager { get; set; }

        public AccountAppService(
            IAbpSession abpSession,
            LoginManager loginManager,
            RegisterManager userManager)
        {
            _AbpSession = abpSession;

            _LoginManager = loginManager;

            _UserManager = userManager;
        }

        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<RegisterOutput> Register(RegisterInput input)
        {
            if (string.IsNullOrWhiteSpace(input.Name)) {
                input.Name = input.UserName;
            }

            await _UserManager.RegisterAsync(input.UserName, input.Password, input.EmailAddress, input.Name, input.TenantId ?? 0);

            return new RegisterOutput();
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<LoginOutput> Login(LoginInput input)
        {
            AbpLoginResult abpLoginResult = await _LoginManager.LoginAsync(input.Username, input.Password, input.TenantId ?? 0);

            if (abpLoginResult.Result == AbpLoginResultType.InvalidUserNameOrEmailAddress) {
                throw new UserFriendlyException("用户名或密码错误");
            }

            if (abpLoginResult.Result == AbpLoginResultType.InvalidPassword) {
                throw new UserFriendlyException("用户名或密码错误");
            }

            return new LoginOutput() { AbpLoginResult = abpLoginResult };
        }
    }
}
