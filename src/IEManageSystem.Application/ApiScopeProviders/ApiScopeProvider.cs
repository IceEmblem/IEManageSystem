using Abp.Dependency;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Entitys.Authorization.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiScopeProviders
{
    /// <summary>
    /// Api域提供器，提供站点Api域的名称
    /// </summary>
    public class ApiScopeProvider: ITransientDependency
    {
        // personal
        public const string User = "Personal.User";

        // core域
        public const string AdminManage = "AuthorizeManage.AdminManage";
        public const string RoleManage = "AuthorizeManage.RoleManage";
        public const string PermissionManage = "AuthorizeManage.PermissionManage";

        // api域
        public const string ApiScopeManage = "AuthorizeManage.ApiScopeManage";

        // oauth域
        public const string IdentityResource = "OAuthManage.IdentityResource";
        public const string ApiResource = "OAuthManage.ApiResource";
        public const string Client = "OAuthManage.Client";

        // cms域
        public const string Menu = "CMSManage.Menu";
        public const string Page = "CMSManage.Page";
        public const string Picture = "CMSManage.Picture";
        public const string Logic = "CMSManage.Logic";
        // public const string LogicExec = "CMSManage.LogicExec";

        // common域
        public const string SiteSetting = "Common.SiteSetting";

        private ApiScopeManager _apiScopeManager { get; set; }

        private PermissionManager _permissionManager { get; set; }

        public ApiScopeProvider(ApiScopeManager apiScopeManager, PermissionManager permissionManager)
        {
            _apiScopeManager = apiScopeManager;

            _permissionManager = permissionManager;
        }

        /// <summary>
        /// 注册Api域，将Api域描述注册为Api域
        /// </summary>
        public void Register()
        {
            var userPermission = _permissionManager.UserPermission;
            _apiScopeManager.Register(User, "用户信息", new List<Permission>() { userPermission }, new List<Permission>() { userPermission });

            _apiScopeManager.Register(AdminManage, "管理员管理");
            _apiScopeManager.Register(RoleManage, "角色管理");
            _apiScopeManager.Register(PermissionManage, "权限管理");
            _apiScopeManager.Register(ApiScopeManage, "Api域管理");

            _apiScopeManager.Register(Menu, "菜单管理");
            _apiScopeManager.Register(Page, "页面管理");
            _apiScopeManager.Register(Picture, "图片管理");
            _apiScopeManager.Register(Logic, "逻辑管理");

            _apiScopeManager.Register(SiteSetting, "站点设置");
        }
    }
}
