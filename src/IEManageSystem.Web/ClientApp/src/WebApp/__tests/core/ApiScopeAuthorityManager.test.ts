import ApiScopeAuthorityManager from "Core/ApiScopeAuthority/ApiScopeAuthorityManager";
import AccessScope, { ApiScopeNodeType } from "Core/ApiScopeAuthority/AccessScope";

test("AisAllowAccessScope_test", ()=>
{
    // 需要访问的域
    let userAccessScope = AccessScope.User(ApiScopeNodeType.manage);
    let roleManageAccessScope = AccessScope.RoleManage(ApiScopeNodeType.manage);

    // 用户所拥有的域的访问权限
    let userScopeAccessAuthorities: Array<UserScopeAccessAuthority> = [{
        scopeName: userAccessScope.scopeName,
        manageAuthority: true,
        queryAuthority: true
    },
    {
        scopeName: roleManageAccessScope.scopeName,
        manageAuthority: false,
        queryAuthority: true
    }];    

    let apiScopeAuthorityManager = new ApiScopeAuthorityManager(userScopeAccessAuthorities);

    expect(apiScopeAuthorityManager.isAllowAccessScope(userAccessScope)).toEqual(true);

    expect(apiScopeAuthorityManager.isAllowAccessScope(roleManageAccessScope)).toEqual(false);
})