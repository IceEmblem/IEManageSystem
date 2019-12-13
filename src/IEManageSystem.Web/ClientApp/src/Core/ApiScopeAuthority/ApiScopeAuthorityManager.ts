import AccessScope, { ApiScopeNodeType } from "./AccessScope";

export default class ApiScopeAuthorityManager
{
    userScopeAccessAuthorities: Array<UserScopeAccessAuthority>;

    // userScopeAccessAuthorities 用户 域访问权限
    constructor(userScopeAccessAuthorities:Array<UserScopeAccessAuthority>) {
        this.userScopeAccessAuthorities = userScopeAccessAuthorities;
    }

    isAllowAccessScope(accessScope: AccessScope)
    {
        for(let item in this.userScopeAccessAuthorities)
        {
            if(accessScope.isAllowAccess(this.userScopeAccessAuthorities[item])){
                return true;
            }
        }

        return false;
    }
}