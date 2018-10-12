using Abp.AutoMapper;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.IdentityService
{
    [AutoMap(typeof(ClientGrantType))]
    public class ClientGrantTypeDto
    {
        public string GrantType { get; set; }
    }
}
