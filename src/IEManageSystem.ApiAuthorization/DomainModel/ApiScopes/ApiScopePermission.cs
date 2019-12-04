using Abp.Domain.Entities;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes.AuthorizationNodes;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    [Table("ApiScopePermission")]
    public class ApiScopePermission : Entity
    {
        protected ApiScopePermission() {
        }

        public ApiScopePermission(ApiScopeNode apiScope, Permission permission)
        {
            ApiScopeId = apiScope.Id;

            PermissionId = PermissionId;

            Permission = permission;
        }

        public int ApiScopeId { get; set; }

        public int PermissionId { get; set; }

        public Permission Permission { get; set; }
    }
}
