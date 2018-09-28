using Abp.AutoMapper;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.IdentityService
{
    [AutoMap(typeof(IdentityClaim))]
    public class IdentityClaimDto
    {
        public int Id { get; set; }
        public string Type { get; set; }

        public IdentityResourceDto IdentityResource { get; set; }
    }
}
