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
    public class AccountDomainService:IDomainService
    {
        private IRepository<User> _UserRepository { get; set; }

        public AccountDomainService(IRepository<User> userRepository)
        {
            _UserRepository = userRepository;
        }

        public bool IsHaveUserName(string userName)
        {
            return _UserRepository.GetAllList(e => e.UserName == userName).Any();
        }

        public User Register(string userName, string password, string emailAddress, string name, int? tenantId)
        {
            password = Encrypt.MD5Utf8(password);

            User user = new User()
            {
                UserName = userName,
                Password = password,
                EmailAddress = emailAddress,
                Name = name,
                TenantId = tenantId
            };

            _UserRepository.Insert(user);
            return user;
        }
    }
}
