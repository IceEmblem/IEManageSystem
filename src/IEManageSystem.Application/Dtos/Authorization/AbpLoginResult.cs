using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Authorization
{
    public class AbpLoginResult
    {
        public AbpLoginResultType Result { get; set; }

        public IdentityUser User { get; set; }
    }
}
