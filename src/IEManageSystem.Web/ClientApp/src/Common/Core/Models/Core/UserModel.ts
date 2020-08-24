interface UserModel{
    id:number,

    account:AccountModel,
    /// 邮箱
    emailAddress:string,
    /// 昵称
    name:string,
    /// 手机号
    phone:string,
    /// 个性签名
    personSignature:string,
    /// 头像
    headSculpture:string,
    /// 真实姓名
    realName:string,
    /// 身份证号
    idNumber:string,
    /// 地址
    address:string,
    /// 性别（true男，false女）
    sex:boolean,
    /// 出生日期
    birthDate:string,

    tenantId:number | null,
}