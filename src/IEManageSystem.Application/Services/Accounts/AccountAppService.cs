using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.Entitys.Authorization.Users.UserManager;
using IEManageSystem.Services.Accounts.Dto;

namespace IEManageSystem.Services.Accounts
{
    public class AccountAppService : IEManageSystemAppServiceBase, IAccountAppService
    {
        private IAbpSession _AbpSession { get; set; }

        private LoginManager _LoginManager { get; set; }

        private UserManager _UserManager { get; set; }

        public AccountAppService(
            IAbpSession abpSession,
            LoginManager loginManager,
            UserManager userManager)
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
                return new LoginOutput() { ErrorMessage = "无效的用户名", AbpLoginResult = abpLoginResult };
            }

            if (abpLoginResult.Result == AbpLoginResultType.InvalidPassword) {
                return new LoginOutput() { ErrorMessage = "无效的密码", AbpLoginResult = abpLoginResult };
            }

            return new LoginOutput() { AbpLoginResult = abpLoginResult };
        }
    }
}
