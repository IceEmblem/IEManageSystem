using IdentityModel;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace IEManageSystem.JwtAuthentication.Model
{
    public class JwtClaimType
    {
        public const string Subject = JwtClaimTypes.Subject;

        public const string Audience = JwtClaimTypes.Audience;

        public const string Issuer = JwtClaimTypes.Issuer;

        public const string NameIdentifier = ClaimTypes.NameIdentifier;

        public const string UserName = "UserName";

        public const string Name = "Name";

        public const string EmailAddress = "EmailAddress";

        public const string Phone = "Phone";

        public const string Permission = "Permission";
    }
}
