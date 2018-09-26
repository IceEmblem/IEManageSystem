using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Users
{
    [Table("User")]
    public class User:Entity
    {
        /// <summary>
        /// 用户名
        /// </summary>
        [Required]
        [MaxLength(15)]
        [MinLength(6)]
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        [Required]
        [MaxLength(60)]
        [MinLength(6)]
        public string Password { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        [Phone]
        public string Phone { get; set; }

        /// <summary>
        /// 头像
        /// </summary>
        public string HeadSculpture { get; set; }

        /// <summary>
        /// 权限
        /// </summary>
        public string Role { get; set; }

        public int? TenantId { get; set; }
    }
}
