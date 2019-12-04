import { ApiScopeNodeType } from "./ApiScopeNodeType.js";

export default class ApiScopeAuthorityManager
{
    // userScopeAccessAuthorities 用户 域访问权限
    constructor(userScopeAccessAuthorities) {
        this.userScopeAccessAuthorities = userScopeAccessAuthorities;
    }

    isAllowAccessMenu(menu)
    {
        // 如果没有指定需求的域，则允许访问
        if(menu.accessScope === undefined){
            return true;
        }

        for(let item in menu.accessScope)
        {
            // 如果需求的域中其中一个没有访问权限，则没有这个菜单的访问权限
            if(this.isAllowAccessScope(menu.accessScope[item].scopeName, menu.accessScope[item].scopeNodeType) === false)
            {
                return false;   
            }
        }

        return true;
    }

    isAllowAccessScope(scopeName, scopeNodeType)
    {
        for(let item in this.userScopeAccessAuthorities)
        {
            if (this.userScopeAccessAuthorities[item].scopeName !== scopeName)
            {
                continue;
            }

            if (scopeNodeType === ApiScopeNodeType.manage) {
                return this.userScopeAccessAuthorities[item].manageAuthority;
            }
            else {
                return this.userScopeAccessAuthorities[item].queryAuthority;
            }
        }

        return false;
    }
}