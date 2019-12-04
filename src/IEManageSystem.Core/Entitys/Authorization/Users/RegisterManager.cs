using Abp.Dependency;
using Abp.Domain.Repositories;
using IEManageSystem.Entitys.Authorization.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityAction.Other;

namespace IEManageSystem.Entitys.Authorization.Users
{
    public class RegisterManager: ITransientDependency
    {
        private UserManager _userManager { get; set; }

        public RegisterManager(
            UserManager userManager
            )
        {
            _userManager = userManager;
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
            var user = await _userManager.CreateUser(userName, password, name, tenantId);

            user.EmailAddress = emailAddress;

            return user;
        }
    }
}
