using Abp.AutoMapper;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.ApiAuthorization
{
    [AutoMap(typeof(ApiScope))]
    public class ApiScopeDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }
    }
}
