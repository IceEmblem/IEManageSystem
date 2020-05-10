using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public class Logic:Entity
    {
        public string Name { get; set; }

        public string Code { get; set; }
    }
}
