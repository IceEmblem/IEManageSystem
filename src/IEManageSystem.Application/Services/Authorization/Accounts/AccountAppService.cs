using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using IEManageSystem.Dtos.Authorization;
using IEManageSystem.Services.Authorization.Accounts.Dto;

namespace IEManageSystem.Services.Authorization.Accounts
{
    public class AccountAppService : IEManageSystemAppServiceBase, IAccountAppService
    {
        private IAbpSession _AbpSession { get; set; }

        private AccountDomainService _AccountDomainService { get; set; }

        private LoginDomainService _LoginDomainService { get; set; }

        public AccountAppService(
            IAbpSession abpSession,
            AccountDomainService accountDomainService,
            LoginDomainService loginDomainService)
        {
            _AbpSession = abpSession;

            _AccountDomainService = accountDomainService;

            _LoginDomainService = loginDomainService;
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

            if (_AccountDomainService.IsHaveUserName(input.UserName)) {
                return new RegisterOutput() { ErrorMessage = "已存在用户名" + input.UserName };
            }

            _AccountDomainService.Register(input.UserName, input.Password, input.EmailAddress, input.Name, input.TenantId);

            return new RegisterOutput();
        }

        /// <summary>
        /// 登录验证
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<LoginOutput> Login(LoginInput input)
        {
            AbpLoginResult abpLoginResult = new AbpLoginResult();

            // 验证用户名
            if ( !_LoginDomainService.ValidateUsername(input.Username, input.TenantId) )
            {
                abpLoginResult.Result = AbpLoginResultType.InvalidUserNameOrEmailAddress;
                return new LoginOutput() { ErrorMessage = "无效的用户名", AbpLoginResult = abpLoginResult };
            }

            // 验证密码
            var user = _LoginDomainService.ValidateUsernameAndPassword(input.Username, input.Password, input.TenantId);
            if (user == null)
            {
                abpLoginResult.Result = AbpLoginResultType.InvalidPassword;
                return new LoginOutput() { ErrorMessage = "无效的密码", AbpLoginResult = abpLoginResult };
            }

            // 验证成功
            abpLoginResult.Result = AbpLoginResultType.Success;
            abpLoginResult.User = new IdentityUser() {
                Id = user.Id,
                UserName = user.UserName,
                EmailAddress = user.EmailAddress,
                Name = user.Name,
                Phone = user.Phone,
                TenantId = user.TenantId
            };

            return new LoginOutput() { AbpLoginResult = abpLoginResult };
        }
    }
}
