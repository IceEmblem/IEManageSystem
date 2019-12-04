using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiScopeProviders
{
    public class ApiScopeGroupDescribe
    {
        public string Name { get; set; }

        public List<ApiScopeDescribe> ApiScopeDescribes { get; set; }
    }
}
