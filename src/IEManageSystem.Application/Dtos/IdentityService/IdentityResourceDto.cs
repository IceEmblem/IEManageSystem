using Abp.AutoMapper;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.IdentityService
{
    [AutoMap(typeof(IdentityResource))]
    public class IdentityResourceDto
    {
        public int Id { get; set; }
        public bool Enabled { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public bool Required { get; set; }
        public bool Emphasize { get; set; }
        public bool ShowInDiscoveryDocument { get; set; }

        public List<IdentityClaimDto> UserClaims { get; set; }
    }
}
