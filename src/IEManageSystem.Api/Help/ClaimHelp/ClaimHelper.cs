using IEManageSystem.Entitys.Authorization.LoginManagers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.ClaimHelp
{
    /// <summary>
    /// 提供站点Claim
    /// </summary>
    public class ClaimHelper
    {
        public ClaimHelper(
            )
        {
        }

        /// <summary>
        /// 用IdentityUser生成Claims
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public List<Claim> CreateClaimsForIdentityUser(IdentityUser user)
        {
            return  new List<Claim>
                    {
                            ClaimBuilder.Id.CreateClaim(user.Id.ToString()),
                            ClaimBuilder.UserName.CreateClaim(user.UserName ?? ""),
                            ClaimBuilder.EmailAddress.CreateClaim(user.EmailAddress ?? ""),
                            ClaimBuilder.Name.CreateClaim(user.Name ?? ""),
                            ClaimBuilder.Phone.CreateClaim(user.Phone ?? ""),
                    };
        }

        /// <summary>
        /// 用Claims生成IdentityUser
        /// </summary>
        /// <param name="claims"></param>
        /// <returns></returns>
        public IdentityUser CreateIdentityUserForClaims(List<Claim> claims)
        {
            return new IdentityUser()
                    {
                        Id = Convert.ToInt32(claims.FirstOrDefault(e => e.Type == ClaimBuilder.Id.ClaimName)?.Value ?? "-1"),
                        EmailAddress = claims.FirstOrDefault(e => e.Type == ClaimBuilder.EmailAddress.ClaimName)?.Value,
                        Name = claims.FirstOrDefault(e => e.Type == ClaimBuilder.Name.ClaimName)?.Value,
                        Phone = claims.FirstOrDefault(e => e.Type == ClaimBuilder.Phone.ClaimName)?.Value,
                        UserName = claims.FirstOrDefault(e => e.Type == ClaimBuilder.UserName.ClaimName)?.Value
                    };
        }
    }
}
