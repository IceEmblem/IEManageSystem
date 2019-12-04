using Abp.AutoMapper;
using IEManageSystem.Entitys.Authorization.Users.Accounts;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Core.Users
{
    [AutoMap(typeof(Account))]
    public class AccountDto
    {
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }

        public SafetyProblemDto SafetyProblem { get; set; }
    }
}
