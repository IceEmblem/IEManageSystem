using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.IdentityService
{
    public class IEIdentityResource : IdentityServer4.EntityFramework.Entities.IdentityResource, IEntity<int>
    {
        public bool IsTransient()
        {
            return false;
        }
    }
}
