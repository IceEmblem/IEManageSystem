using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto
{
    public class CreateAdminInput
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
        [EmailAddress]
        public string EmailAddress { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        [MaxLength(20)]
        public string Name { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        [Phone]
        public string Phone { get; set; }

        public int? TenantId { get; set; }
    }
}
