using Abp.Events.Bus;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Permissions
{
    public class PermissionDeleteEventData : EventData
    {
        public PermissionDeleteEventData(int permissionId, string permissionName) 
        {
            PermissionId = permissionId;
            PermissionName = permissionName;
        }

        public int PermissionId { get; protected set; }

        public string PermissionName { get; protected set; }
    }
}
