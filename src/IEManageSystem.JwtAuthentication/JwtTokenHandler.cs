using Abp.Dependency;
using IEManageSystem.JwtAuthentication.Model;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IEManageSystem.JwtAuthentication
{
    public class JwtTokenHandler: ITransientDependency
    {
        private ClaimManager _claimManager { get; set; }

        public JwtTokenHandler(ClaimManager claimManager)
        {
            _claimManager = claimManager;
        }

        /// <summary>
        /// 根据用户信息和密匙生成token
        /// </summary>
        /// <param name="userInfo"></param>
        /// <param name="symmetricKey"></param>
        /// <returns></returns>
        public string CreateToken(UserClaimInfo userInfo, string symmetricKey)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(_claimManager.CreateClaims(userInfo)),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = 
                    new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.ASCII.GetBytes(symmetricKey)),
                        SecurityAlgorithms.HmacSha256Signature
                    )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// 获取token所包含的claim的类型列表
        /// </summary>
        /// <returns></returns>
        public List<string> GetTokenClaimTypes() {
            return _claimManager.GetIssueClaims();
        }
    }
}
