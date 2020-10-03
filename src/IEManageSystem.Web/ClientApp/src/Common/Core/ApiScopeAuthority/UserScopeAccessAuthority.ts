// 用户对该域的访问权限
export default interface UserScopeAccessAuthority{
    // 域名称
    scopeName: string,
    // 是否拥有该域的管理权限
    manageAuthority: boolean,
    // 是否拥有该域的访问权限
    queryAuthority: boolean
}