using Abp.Dependency;
using Abp.Domain.Repositories;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityAction.Other;

namespace IEManageSystem.Entitys.Authorization.LoginManagers
{
    public class LoginManager: ITransientDependency
    {
        private IRepository<User> _UserRepository { get; set; }

        public LoginManager(
            IRepository<User> userRepository
            )
        {
            _UserRepository = userRepository;
        }

        public async Task<AbpLoginResult> LoginAsync(string userName, string password, int tenantId)
        {
            AbpLoginResult abpLoginResult = new AbpLoginResult();

            // 验证用户名
            if ( !(await _UserRepository.GetAllListAsync(e => e.UserName == userName && e.TenantId == tenantId)).Any())
            {
                abpLoginResult.Result = AbpLoginResultType.InvalidUserNameOrEmailAddress;
                return abpLoginResult;
            }

            // 验证密码
            password = Encrypt.MD5Utf8(password);
            var user = await _UserRepository.FirstOrDefaultAsync(e => e.UserName == userName && e.Password == password && e.TenantId == tenantId);
            if (user == null)
            {
                abpLoginResult.Result = AbpLoginResultType.InvalidPassword;
                return abpLoginResult;
            }

            // 验证成功
            abpLoginResult.Result = AbpLoginResultType.Success;
            abpLoginResult.User = new IdentityUser()
            {
                Id = user.Id,
                UserName = user.UserName,
                EmailAddress = user.EmailAddress,
                Name = user.Name,
                Phone = user.Phone,
                TenantId = user.TenantId
            };
            return abpLoginResult;
        }
    }
}
