using Abp.AutoMapper;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.IdentityService
{
    [AutoMap(typeof(ClientPostLogoutRedirectUri))]
    public class ClientPostLogoutRedirectUriDto
    {
        public string PostLogoutRedirectUri { get; set; }
    }
}
