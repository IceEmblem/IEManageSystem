using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.ClaimHelp
{
    public class ClaimData
    {
        public string Name { get; }

        public ClaimData(string name)
        {
            Name = name;
        }

        public Claim CreateClaim(string value)
        {
            return new Claim(Name,value);
        }
    }
}
