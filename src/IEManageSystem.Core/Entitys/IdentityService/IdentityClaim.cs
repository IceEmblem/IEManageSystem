using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.IdentityService
{
    public class IdentityClaim : IdentityServer4.EntityFramework.Entities.IdentityClaim, IEntity<int>
    {
        public bool IsTransient()
        {
            return false;
        }
    }
}
