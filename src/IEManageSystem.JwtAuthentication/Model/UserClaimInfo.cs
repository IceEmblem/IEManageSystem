using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.JwtAuthentication.Model
{
    public class UserClaimInfo
    {
        public UserClaimInfo(string subject, IEnumerable<string> permissions)
        {
            Subject = subject;

            Permissions = new List<string>(permissions);
        }

        public string Subject { get; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public IReadOnlyList<string> Permissions { get; }
    }
}
