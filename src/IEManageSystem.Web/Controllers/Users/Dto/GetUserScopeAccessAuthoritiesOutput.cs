using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Controllers.Users.Dto
{
    public class GetUserScopeAccessAuthoritiesOutput
    {
        public List<UserScopeAccessAuthority> UserScopeAccessAuthoritys { get; set; }
    }
}
