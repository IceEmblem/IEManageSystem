using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.ClaimHelp
{
    public class ClaimHelper
    {
        public static ClaimData Id { get; } = new ClaimData("Id");

        public static ClaimData UserName { get; } = new ClaimData("UserName");

        public static ClaimData EmailAddress { get; } = new ClaimData("EmailAddress");

        public static ClaimData Name { get; } = new ClaimData("Name");

        public static ClaimData Phone { get; } = new ClaimData("Phone");

        public ClaimHelper() {
        }
    }
}
