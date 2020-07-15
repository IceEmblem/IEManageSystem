using Abp.Dependency;
using IEManageSystem.JwtAuthentication.Configuration;
using IEManageSystem.JwtAuthentication.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace IEManageSystem.JwtAuthentication
{
    public class ClaimManager : ITransientDependency
    {
        public List<Claim> CreateClaims(UserClaimInfo userInfo)
        {
            List<Claim> claims = new List<Claim>() {
                new Claim(JwtClaimType.Subject, userInfo.Subject),
                new Claim(JwtClaimType.Audience, JwtAuthenConfiguration.Audience),
                new Claim(JwtClaimType.Issuer, JwtAuthenConfiguration.Issuer),
                new Claim(JwtClaimType.NameIdentifier, userInfo.Subject),
                new Claim(JwtClaimType.UserName, userInfo.UserName),
                new Claim(JwtClaimType.Name, userInfo.Name ?? ""),
                new Claim(JwtClaimType.EmailAddress, userInfo.EmailAddress ?? ""),
                new Claim(JwtClaimType.Phone, userInfo.Phone ?? ""),
            };

            foreach (var e in userInfo.Permissions) {
                claims.Add(new Claim(JwtClaimType.Permission, e));
            }

            return claims;
        }

        public UserClaimInfo CreateUserClaimInfo(IEnumerable<Claim> claims) 
        {
            return new UserClaimInfo(
                claims.FirstOrDefault(e=>e.Type == JwtClaimType.NameIdentifier).Value, 
                claims.Where(e => e.Type == JwtClaimType.Permission).Select(e => e.Value));
        }

        /// <summary>
        /// 获取公布的claim类型
        /// </summary>
        /// <returns></returns>
        public List<string> GetIssueClaims()
        {
            return new List<string>() {
                JwtClaimType.Subject,
                JwtClaimType.Audience,
                JwtClaimType.Issuer,
                JwtClaimType.NameIdentifier,
                JwtClaimType.UserName,
                JwtClaimType.Name,
                JwtClaimType.EmailAddress,
                JwtClaimType.Phone,
            };
        }

        /// <summary>
        /// 从claim中获取permission列表
        /// </summary>
        /// <param name="claims"></param>
        /// <returns></returns>
        public IEnumerable<string> GetPermissionsForClaims(IEnumerable<Claim> claims)
        {
            return claims.Where(e => e.Type == JwtClaimType.Permission).Select(e => e.Value);
        }
    }
}
