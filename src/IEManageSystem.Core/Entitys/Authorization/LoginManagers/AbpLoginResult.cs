using IEManageSystem.Entitys.Authorization.Identitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.LoginManagers
{
    public class AbpLoginResult
    {
        public AbpLoginResultType Result { get; set; }

        public IdentityUser User { get; set; }
    }
}
