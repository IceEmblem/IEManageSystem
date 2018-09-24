using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using IEManageSystem.Dtos.Authorization;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Services.Authorization.Users.Dto;

namespace IEManageSystem.Services.Authorization.Users
{
    public class UserAppService : IUserAppService
    {
        private IAbpSession _AbpSession { get; set; }

        private IRepository<User> _UserRepository { get; set; }

        public UserAppService(
            IAbpSession abpSession,
            IRepository<User> userRepository
            )
        {
            _AbpSession = abpSession;

            _UserRepository = userRepository;
        }

        public async Task<GetIdentityOutput> GetIdentity(GetIdentityInput input)
        {
            var user = await _UserRepository.FirstOrDefaultAsync((int)(_AbpSession.UserId ?? 0));
            if (user == null)
            {
                return new GetIdentityOutput() { ErrorMessage = "未找到当前用户的信息" };
            }

            IdentityUser identityUser = new IdentityUser() {
                Id = user.Id,
                EmailAddress = user.EmailAddress,
                Name = user.Name,
                Phone = user.Phone,
                UserName = user.UserName,
                TenantId = user.TenantId,
            };

            return new GetIdentityOutput() { IdentityUser = identityUser };
        }
    }
}
