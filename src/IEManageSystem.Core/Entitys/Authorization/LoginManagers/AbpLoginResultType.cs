using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.LoginManagers
{
    public enum AbpLoginResultType
    {
        Success = 1,
        InvalidUserNameOrEmailAddress = 2,
        InvalidPassword = 3
    }
}
