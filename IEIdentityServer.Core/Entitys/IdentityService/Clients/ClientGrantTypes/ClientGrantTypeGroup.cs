using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEIdentityServer.Core.Entitys.IdentityService.Clients.ClientGrantTypes
{
    public class ClientGrantTypeGroup
    {
        public static ClientGrantTypeGroup ClientCredentials {
            get { return new ClientGrantTypeGroup("ClientCredentials", GrantTypes.ClientCredentials); }
        }

        public static ClientGrantTypeGroup Code
        {
            get { return new ClientGrantTypeGroup("Code", GrantTypes.Code); }
        }

        public static ClientGrantTypeGroup CodeAndClientCredentials
        {
            get { return new ClientGrantTypeGroup("CodeAndClientCredentials", GrantTypes.CodeAndClientCredentials); }
        }

        public static ClientGrantTypeGroup Hybrid
        {
            get { return new ClientGrantTypeGroup("Hybrid", GrantTypes.Hybrid); }
        }

        public static ClientGrantTypeGroup HybridAndClientCredentials
        {
            get { return new ClientGrantTypeGroup("HybridAndClientCredentials", GrantTypes.HybridAndClientCredentials); }
        }

        public static ClientGrantTypeGroup Implicit
        {
            get { return new ClientGrantTypeGroup("Implicit", GrantTypes.Implicit); }
        }

        public static ClientGrantTypeGroup ImplicitAndClientCredentials
        {
            get { return new ClientGrantTypeGroup("ImplicitAndClientCredentials", GrantTypes.ImplicitAndClientCredentials); }
        }

        public static ClientGrantTypeGroup ResourceOwnerPassword
        {
            get { return new ClientGrantTypeGroup("ResourceOwnerPassword", GrantTypes.ResourceOwnerPassword); }
        }

        public static ClientGrantTypeGroup ResourceOwnerPasswordAndClientCredentials
        {
            get { return new ClientGrantTypeGroup("ResourceOwnerPasswordAndClientCredentials", GrantTypes.ResourceOwnerPasswordAndClientCredentials); }
        }

        protected ClientGrantTypeGroup(string name, ICollection<string> clientGrantTypes)
        {
            Name = name;
            ClientGrantTypes = clientGrantTypes;
        }

        public string Name { get; }

        public ICollection<string> ClientGrantTypes { get; }
    }
}
