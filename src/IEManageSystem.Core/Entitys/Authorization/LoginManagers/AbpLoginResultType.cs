using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.LoginManagers
{
    public enum AbpLoginResultType
    {
        /// <summary>
        /// 登录成功
        /// </summary>
        Success = 1,

        /// <summary>
        /// 无效的用户名
        /// </summary>
        InvalidUserNameOrEmailAddress = 2,

        /// <summary>
        /// 无效的密码
        /// </summary>
        InvalidPassword = 3
    }
}
