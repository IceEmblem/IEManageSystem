using Abp.AutoMapper;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.IdentityService
{
    [AutoMap(typeof(ApiResourceClaim))]
    public class ApiResourceClaimDto
    {
        public int Id { get; set; }
        public string Type { get; set; }

        public ApiResourceDto ApiResource { get; set; }
    }
}
