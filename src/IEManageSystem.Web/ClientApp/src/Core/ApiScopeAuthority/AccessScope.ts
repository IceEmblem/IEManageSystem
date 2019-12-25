export enum ApiScopeNodeType {
    manage,
    query
}

// 需要访问的域
export default class AccessScope {
    scopeName: string;
    scopeNodeType: ApiScopeNodeType;
    
    private constructor(scopeName:string, scopeNodeType:ApiScopeNodeType){
        this.scopeName = scopeName;
        this.scopeNodeType = scopeNodeType;
    }

    // 是否可以访问
    public isAllowAccess(accessAuthority: UserScopeAccessAuthority)
    {
        if(accessAuthority.scopeName != this.scopeName){
            return false;
        }

        if (this.scopeNodeType === ApiScopeNodeType.manage) {
            return accessAuthority.manageAuthority;
        }
        else {
            return accessAuthority.queryAuthority;
        }
    }

    public isManageScope(){
        return this.scopeNodeType == ApiScopeNodeType.manage;
    }

    public isQueryScope(){
        return this.scopeNodeType == ApiScopeNodeType.query;
    }

    static User(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("Personal.User", apiScopeNodeType);
    }

    static AdminManage(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("AuthorizeManage.AdminManage", apiScopeNodeType);
    }

    static RoleManage(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("AuthorizeManage.RoleManage", apiScopeNodeType);
    }

    static PermissionManage(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("AuthorizeManage.PermissionManage", apiScopeNodeType);
    }

    static ApiScopeManage(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("AuthorizeManage.ApiScopeManage", apiScopeNodeType);
    }

    static IdentityResource(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("OAuthManage.IdentityResource", apiScopeNodeType);
    }

    static ApiResource(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("OAuthManage.ApiResource", apiScopeNodeType);
    }

    static Client(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("OAuthManage.Client", apiScopeNodeType);
    }

    static Menu(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("CMSManage.Menu", apiScopeNodeType);
    }

    static Page(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("CMSManage.Page", apiScopeNodeType);
    }

    static SiteSetting(apiScopeNodeType: ApiScopeNodeType){
        return new AccessScope("Common.SiteSetting", apiScopeNodeType);
    }
}