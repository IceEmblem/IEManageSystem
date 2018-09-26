using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.ClaimHelp
{
    public class ClaimBuilder
    {
        public static ClaimBuilder Id {
            get {
                return new ClaimBuilder("Id");
            }
        }

        public static ClaimBuilder UserName {
            get {
                return new ClaimBuilder("UserName");
            }
        }

        public static ClaimBuilder EmailAddress {
            get {
                return new ClaimBuilder("EmailAddress");
            }
        }

        public static ClaimBuilder Name {
            get {
                return new ClaimBuilder("Name");
            }
        }

        public static ClaimBuilder Phone {
            get {
                return new ClaimBuilder("Phone");
            }
        }

        public string ClaimName { get; }

        private ClaimBuilder(string name)
        {
            ClaimName = name;
        }

        public Claim CreateClaim(string value)
        {
            return new Claim(ClaimName, value);
        }
    }
}
