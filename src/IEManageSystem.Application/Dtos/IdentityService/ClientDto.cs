using Abp.AutoMapper;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.IdentityService
{
    [AutoMap(typeof(Client))]
    public class ClientDto
    {
        public string ClientId { get; set; }

        public List<ClientGrantTypeDto> AllowedGrantTypes { get; set; }

        // public List<ClientSecretDto> ClientSecrets { get; set; }

        public List<ClientRedirectUriDto> RedirectUris { get; set; }

        public List<ClientPostLogoutRedirectUriDto> PostLogoutRedirectUris { get; set; }

        public bool AllowOfflineAccess { get; set; }
    }
}
