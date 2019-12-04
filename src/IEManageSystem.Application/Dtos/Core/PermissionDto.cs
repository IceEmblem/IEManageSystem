using Abp.AutoMapper;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Core
{
    [AutoMap(typeof(Permission))]
    public class PermissionDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }
    }
}
