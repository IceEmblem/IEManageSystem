using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class UserScopeAccessAuthority
    {
        public UserScopeAccessAuthority(string scopeName, bool manageAuthority, bool queryAuthority)
        {
            ScopeName = scopeName;

            ManageAuthority = manageAuthority;

            QueryAuthority = queryAuthority;
        }

        public string ScopeName { get; set; }

        public bool ManageAuthority { get; private set; }

        public bool QueryAuthority { get; private set; }
    }
}
