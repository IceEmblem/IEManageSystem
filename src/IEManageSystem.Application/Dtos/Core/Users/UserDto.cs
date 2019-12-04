using Abp.AutoMapper;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Core.Users
{
    [AutoMap(typeof(User))]
    public class UserDto
    {
        public int Id { get; set; }

        public AccountDto Account { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string EmailAddress { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 个性签名
        /// </summary>
        public string PersonSignature { get; set; }

        /// <summary>
        /// 头像
        /// </summary>
        public string HeadSculpture { get; set; }

        /// <summary>
        /// 真实姓名
        /// </summary>
        public string RealName { get; set; }

        /// <summary>
        /// 身份证号
        /// </summary>
        public string IDNumber { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 性别（true男，false女）
        /// </summary>
        public bool Sex { get; set; }

        /// <summary>
        /// 出生日期
        /// </summary>
        public DateTime BirthDate { get; set; }

        public int? TenantId { get; set; }
    }
}
