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
        Task<GetApiScopesOutput> GetApiScopes(GetApiScopesInput input);

        Task<GetManagePermissionsOutput> GetManagePermissions(GetManagePermissionsInput input);

        Task<GetManagePermissionsByNameOutput> GetManagePermissionsByName(GetManagePermissionsByNameInput input);

        Task<AddManagePermissionOutput> AddManagePermission(AddManagePermissionInput input);

        Task<RemoveManagePermissionOutput> RemoveManagePermission(RemoveManagePermissionInput input);

        Task<GetQueryPermissionsOutput> GetQueryPermissions(GetQueryPermissionsInput input);

        Task<GetQueryPermissionsByNameOutput> GetQueryPermissionsByName(GetQueryPermissionsByNameInput input);

        Task<AddQueryPermissionOutput> AddQueryPermission(AddQueryPermissionInput input);

        Task<RemoveQueryPermissionOutput> RemoveQueryPermission(RemoveQueryPermissionInput input);
    }
}
