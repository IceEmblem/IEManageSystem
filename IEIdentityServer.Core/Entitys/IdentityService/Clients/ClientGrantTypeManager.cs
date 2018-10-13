using Abp.Dependency;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEIdentityServer.Core.Entitys.IdentityService.Clients
{
    public class ClientGrantTypeManager: ITransientDependency
    {
        private static List<string> _grantTypeStringList = new List<string>() {
            GrantType.AuthorizationCode,
            GrantType.ClientCredentials,
            GrantType.Hybrid,
            GrantType.Implicit,
            GrantType.ResourceOwnerPassword,
        };

        public List<string> GetClientGrantTypes()
        {
            return new List<string>(_grantTypeStringList);
        }

        public bool IsExistClientGrantType(string type)
        {
            return _grantTypeStringList.Contains(type);
        }
    }
}
