using Abp.Dependency;
using Abp.Domain.Repositories;
using IEManageSystem.Help.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityAction.Other;

namespace IEManageSystem.Entitys.Authorization.Users.UserManager
{
    public class UserManager: ITransientDependency
    {
        private IRepository<User> _UserRepository { get; set; }

        public UserManager(
            IRepository<User> userRepository
            )
        {
            _UserRepository = userRepository;
        }

        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="emailAddress"></param>
        /// <param name="name"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        public async Task<User> RegisterAsync(string userName, string password, string emailAddress, string name, int? tenantId)
        {
            if ((await _UserRepository.GetAllListAsync(e => e.UserName == userName)).Any())
            {
                throw new MessageException("已存在[" + userName + "]的账号，请重新注册");
            }

            if ((await _UserRepository.GetAllListAsync(e => e.EmailAddress == emailAddress)).Any())
            {
                throw new MessageException("邮箱[" + emailAddress + "]已被注册");
            }

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
