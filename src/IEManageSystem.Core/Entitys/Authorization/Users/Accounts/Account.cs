using Abp.Domain.Entities;
using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Users.Accounts
{
    [Table("Account")]
    public class Account : Entity
    {
        public Account(string userName)
        {
            UserName = userName;

            SafetyProblem = new SafetyProblem(null, null);
        }

        /// <summary>
        /// 用户名
        /// </summary>
        [Required]
        [MaxLength(15)]
        [MinLength(6)]
        public string UserName { get; protected set; }

        /// <summary>
        /// 密码
        /// </summary>
        [Required]
        [MaxLength(60)]
        [MinLength(6)]
        public string Password { get; set; }

        /// <summary>
        /// 安全问题
        /// </summary>
        public SafetyProblem SafetyProblem { get; set; }
    }
}
