using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins
{
    public interface IAdminManageAppService : IApplicationService
    {
        GetAdminsOutput GetAdmins(GetAdminsInput input);

        Task<CreateAdminOutput> CreateAdmin(CreateAdminInput input);

        UpdateAdminOutput UpdateAdmin(UpdateAdminInput input);

        DeleteAdminOutput DeleteAdmin(DeleteAdminInput input);

        GetAdminRolesOutput GetAdminRoles(GetAdminRolesInput input);

        AddRoleOutput AddRole(AddRoleInput input);

        RemoveRoleOutput RemoveRole(RemoveRoleInput input);

        GetPermissionsOutput GetPermissions(GetPermissionsInput input);
    }
}
