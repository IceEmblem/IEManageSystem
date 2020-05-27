using Abp.Domain.Entities;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes.AuthorizationNodes;
using IEManageSystem.Entitys.Authorization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    [Table("ApiScope")]
    public class ApiScope:Entity
    {
        protected ApiScope() {
        }

        public ApiScope(string name, string displayName = null)
        {
            Name = name;

            DisplayName = displayName ?? name;

            ApiManageScope = new ApiManageScope();

            ApiQueryScope = new ApiQueryScope();
        }

        public string Name { get; protected set; }

        public string DisplayName { get; protected set; }

        public ApiScopeNode ApiManageScope { get; set; }

        public ApiScopeNode ApiQueryScope { get; set; }

        public void SetDisplayName(string displayName)
        {
            DisplayName = displayName;
        }
    }
}
