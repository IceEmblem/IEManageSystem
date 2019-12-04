using Abp.AutoMapper;
using IEManageSystem.Entitys.Authorization.Roles;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Core
{
    [AutoMap(typeof(Role))]
    public class RoleDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Describe { get; set; }
    }
}
