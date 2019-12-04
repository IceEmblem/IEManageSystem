using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Roles.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Roles
{
    public interface IRoleManageAppService : IApplicationService
    {
        Task<GetRolesOutput> GetRoles(GetRolesInput input);

        Task<AddRoleOutput> AddRole(AddRoleInput input);

        Task<UpdateRoleOutput> UpdateRole(UpdateRoleInput input);

        Task<DeleteRoleOutput> DeleteRole(DeleteRoleInput input);

        Task<GetPermissionsOutput> GetPermissions(GetPermissionsInput input);

        Task<AddPermissionOutput> AddPermission(AddPermissionInput input);

        Task<RemovePermissionOutput> RemovePermission(RemovePermissionInput input);
    }
}
