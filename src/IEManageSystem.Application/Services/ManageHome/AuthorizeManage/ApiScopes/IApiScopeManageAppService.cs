using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes
{
    public interface IApiScopeManageAppService : IApplicationService
    {
        GetApiScopesOutput GetApiScopes(GetApiScopesInput input);

        GetManagePermissionsOutput GetManagePermissions(GetManagePermissionsInput input);

        GetManagePermissionsByNameOutput GetManagePermissionsByName(GetManagePermissionsByNameInput input);

        AddManagePermissionOutput AddManagePermission(AddManagePermissionInput input);

        RemoveManagePermissionOutput RemoveManagePermission(RemoveManagePermissionInput input);

        GetQueryPermissionsOutput GetQueryPermissions(GetQueryPermissionsInput input);

        GetQueryPermissionsByNameOutput GetQueryPermissionsByName(GetQueryPermissionsByNameInput input);

        AddQueryPermissionOutput AddQueryPermission(AddQueryPermissionInput input);

        RemoveQueryPermissionOutput RemoveQueryPermission(RemoveQueryPermissionInput input);
    }
}
