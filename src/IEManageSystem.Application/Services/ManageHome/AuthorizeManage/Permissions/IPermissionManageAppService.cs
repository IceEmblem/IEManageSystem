using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions
{
    public interface IPermissionManageAppService : IApplicationService
    {
        GetPermissionsOutput GetPermissions(GetPermissionsInput input);

        AddPermissionOutput AddPermission(AddPermissionInput input);

        DeletePermissionOutput DeletePermission(DeletePermissionInput input);

        UpdatePermissionOutput UpdatePermission(UpdatePermissionInput input);
    }
}
