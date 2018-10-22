using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace IEIdentityServer.Core.Entitys.IdentityService.Clients.ClientGrantTypes
{
    public class ClientGrantTypeGroupManager: ITransientDependency
    {
        private static List<ClientGrantTypeGroup> _grantTypeGroupList = new List<ClientGrantTypeGroup>() {
            ClientGrantTypeGroup.ClientCredentials,
            ClientGrantTypeGroup.Code,
            ClientGrantTypeGroup.CodeAndClientCredentials,
            ClientGrantTypeGroup.Hybrid,
            ClientGrantTypeGroup.HybridAndClientCredentials,
            ClientGrantTypeGroup.Implicit,
            ClientGrantTypeGroup.ImplicitAndClientCredentials,
            ClientGrantTypeGroup.ResourceOwnerPassword,
            ClientGrantTypeGroup.ResourceOwnerPasswordAndClientCredentials,
        };

        public List<string> GetClientGrantTypesName()
        {
            return new List<string>(_grantTypeGroupList.Select(e=>e.Name));
        }

        public bool IsExistClientGrantType(string name)
        {
            return _grantTypeGroupList.Select(e => e.Name).Contains(name);
        }

        public ICollection<string> GetClientGrantTypesForName(string name)
        {
            var clientGrantTypeGroup = _grantTypeGroupList.FirstOrDefault(e => e.Name == name);

            if (clientGrantTypeGroup == null) {
                throw new Exception("不存在的认证类型名称");
            }

            return clientGrantTypeGroup.ClientGrantTypes;
        }
    }
}
