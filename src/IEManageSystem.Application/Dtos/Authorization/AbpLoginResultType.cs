using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Authorization
{
    public enum AbpLoginResultType
    {
        Success = 1,
        InvalidUserNameOrEmailAddress = 2,
        InvalidPassword = 3
    }
}
