using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Identitys
{
    public class IdentityUser
    {
        public int Id { get; set; }

        /// <summary>
        /// 账号
        /// </summary>
        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        /// <summary>
        /// 用户昵称
        /// </summary>
        public string Name { get; set; }

        public string Phone { get; set; }

        public int? TenantId { get; set; }

        public List<string> Roles { get; set; }

        public List<string> Permissions { get; set; }
    }
}
