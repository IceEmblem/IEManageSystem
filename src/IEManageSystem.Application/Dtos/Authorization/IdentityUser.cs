using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Authorization
{
    public class IdentityUser
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public int? TenantId { get; set; }
    }
}
