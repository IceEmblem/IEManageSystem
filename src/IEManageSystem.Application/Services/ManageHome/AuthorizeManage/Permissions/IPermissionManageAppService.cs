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
        Task<GetPermissionsOutput> GetPermissions(GetPermissionsInput input);

        Task<AddPermissionOutput> AddPermission(AddPermissionInput input);

        Task<DeletePermissionOutput> DeletePermission(DeletePermissionInput input);

        Task<UpdatePermissionOutput> UpdatePermission(UpdatePermissionInput input);
    }
}
