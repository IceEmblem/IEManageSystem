using IEManageSystem.JwtAuthentication.Authorizations;
using IEManageSystem.JwtAuthentication.Configuration;
using IEManageSystem.JwtAuthentication.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.JwtAuthentication
{
    public static class JwtAuthenticationExtensions
    {
        public static IServiceCollection AddIEAuthorization(this IServiceCollection services)
        {
            return services.AddScoped<IAuthorizationHandler, IEAuthorizationPolicy>();
        }

        public static AuthenticationBuilder AddIEJwtBearer(this IServiceCollection services, 
            string issuer,
            string audience,
            string symmetricKey)
        {
            if (string.IsNullOrWhiteSpace(issuer)) {
                throw new Exception("无效的issuer");
            }

            if (string.IsNullOrWhiteSpace(audience)) {
                throw new Exception("无效的audience");
            }

            JwtAuthenConfiguration.Issuer = issuer;
            JwtAuthenConfiguration.Audience = audience;

            return services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = JwtClaimType.UserName,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(symmetricKey))
                };

                options.IncludeErrorDetails = true;
            });
        }
    }
}
