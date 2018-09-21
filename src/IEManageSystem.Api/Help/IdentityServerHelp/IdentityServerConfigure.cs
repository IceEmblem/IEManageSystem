using IdentityServer4;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.IdentityServerHelp
{
    public class IdentityServerConfigure
    {
        public static IEnumerable<IdentityResource> GetIdentityResourceResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(){
                    DisplayName = "当前用户标识",
                }, //必须要添加，否则报无效的scope错误
                new IdentityResources.Profile(){
                    DisplayName = "基本信息（包括用户Id，用户账户，用户昵称）",
                    UserClaims = new List<string>(){
                        "Id",
                        "UserName",
                        "Name",
                    },
                },
                new IdentityResources.Email(){
                    DisplayName = "邮箱地址",
                    UserClaims = new List<string>(){
                        "EmailAddress",
                    },
                },
                new IdentityResources.Phone(){
                    DisplayName = "手机号码",
                    UserClaims = new List<string>(){
                        "Phone",
                    },
                },
            };
        }
        // scopes define the API resources in your system
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("IEApi", "IceEmblem API")
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                new Client
                {
                    ClientId = "IEClient",
                    AllowedGrantTypes = GrantTypes.Implicit,

                    RedirectUris = { "http://localhost:5002/signin-oidc" },
                    PostLogoutRedirectUris = { "http://localhost:5002/signout-callback-oidc" },

                    AllowedScopes = { 
                        IdentityServerConstants.StandardScopes.OpenId, //必须要添加，否则报forbidden错误
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.Phone,
                    },
                }
            };
        }
    }
}
