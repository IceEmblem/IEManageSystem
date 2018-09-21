using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.Entitys.Authorization;
using System;
using System.Collections.Generic;
using System.Text;
using UtilityAction.Other;
using System.Linq;

namespace IEManageSystem.Services.Authorization.Accounts
{
    public class LoginDomainService:IDomainService
    {
        private IRepository<User> _UserRepository { get; set; }

        public LoginDomainService(IRepository<User> userRepository)
        {
            _UserRepository = userRepository;
        }

        public bool ValidateUsername(string userName, int? tenantId)
        {
            return _UserRepository.GetAllList(e => e.UserName == userName && e.TenantId == tenantId).Any();
        }

        public User ValidateUsernameAndPassword(string userName, string password, int? tenantId)
        {
            password = Encrypt.MD5Utf8(password);

            return _UserRepository.FirstOrDefault(e=>e.UserName == userName && e.Password == password && e.TenantId == tenantId);
        }
    }
}
