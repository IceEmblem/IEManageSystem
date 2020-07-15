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
            List<ApiScope> apiScopes = new List<ApiScope>();

            var userPermission = _permissionManager.UserPermission;
            var userApiScope = new ApiScope(User, "用户信息");
            userApiScope.ApiManageScope.AddPermission(userPermission);
            userApiScope.ApiQueryScope.AddPermission(userPermission);

            apiScopes.Add(userApiScope);
            apiScopes.Add(new ApiScope(AdminManage, "管理员管理"));
            apiScopes.Add(new ApiScope(RoleManage, "角色管理"));
            apiScopes.Add(new ApiScope(PermissionManage, "权限管理"));
            apiScopes.Add(new ApiScope(ApiScopeManage, "Api域管理"));

            apiScopes.Add(new ApiScope(Menu, "菜单管理"));
            apiScopes.Add(new ApiScope(Page, "页面管理"));
            apiScopes.Add(new ApiScope(Picture, "图片管理"));
            apiScopes.Add(new ApiScope(Logic, "逻辑管理"));

            apiScopes.Add(new ApiScope(SiteSetting, "站点设置"));

            _apiScopeManager.RegisterRange(apiScopes);
        }
    }
}
