export default interface SiteSettingModel {
    id: string,

    key: string,

    value: string,

    displayName: string,
    // 所属的组（组名称相同属于相同的组）
    group: string,
}