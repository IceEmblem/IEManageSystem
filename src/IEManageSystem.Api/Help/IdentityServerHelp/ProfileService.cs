using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.IdentityServerHelp
{
    public class ProfileService : IProfileService
    {
        private readonly IResourceStore _resourceStore;

        public ProfileService(IResourceStore resourceStore) {
            _resourceStore = resourceStore;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                //depending on the scope accessing the user data.
                var claims = context.Subject.Claims.ToList();

                // 获取客户端的要求
                List<string> allowsClaimTypes = new List<string>();
                var resources = await _resourceStore.FindEnabledResourcesByScopeAsync(context.Client.AllowedScopes);
                if (resources != null && (resources.IdentityResources.Any() || resources.ApiResources.Any()))
                {
                    foreach (var item in resources.IdentityResources.ToList()) {
                        allowsClaimTypes.AddRange(item.UserClaims);
                    }

                    foreach (var item in resources.ApiResources.ToList())
                    {
                        allowsClaimTypes.AddRange(item.UserClaims);
                    }
                }

                claims = claims.Where(e => allowsClaimTypes.Contains(e.Type)).ToList();

                //set issued claims to return
                context.IssuedClaims = claims.ToList();
            }
            catch (Exception ex)
            {
                //log your error
            }
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
        }
    }
}
