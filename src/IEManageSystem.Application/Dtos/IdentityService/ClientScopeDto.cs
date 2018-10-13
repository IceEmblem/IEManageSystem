using Abp.AutoMapper;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.IdentityService
{
    [AutoMap(typeof(ClientScope))]
    public class ClientScopeDto
    {
        public string Scope { get; set; }
    }
}
