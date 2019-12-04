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
        Task<GetAdminsOutput> GetAdmins(GetAdminsInput input);

        Task<CreateAdminOutput> CreateAdmin(CreateAdminInput input);

        Task<UpdateAdminOutput> UpdateAdmin(UpdateAdminInput input);

        Task<DeleteAdminOutput> DeleteAdmin(DeleteAdminInput input);

        Task<GetAdminRolesOutput> GetAdminRoles(GetAdminRolesInput input);

        Task<AddRoleOutput> AddRole(AddRoleInput input);

        Task<RemoveRoleOutput> RemoveRole(RemoveRoleInput input);

        Task<GetPermissionsOutput> GetPermissions(GetPermissionsInput input);
    }
}
