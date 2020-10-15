import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;

    constructor(pageComponentSetting: PageComponentSettingModel) {
        this.setting = pageComponentSetting;
    }

    get lines() {
        return this.setting.lines;
    }

    set lines(val) {
        this.setting.lines = val;
    }

    getLines(): Array<string> {
        return this.setting.lines ?
            this.setting.lines.split("|")
            : []
    }

    get suffix() {
        return this.setting.suffix || "";
    }

    set suffix(val) {
        this.setting.suffix = val;
    }

    get type() {
        return this.setting.type || "zz";
    }

    set type(val) {
        this.setting.type = val;
    }

    // 是否是折线
    get iszx() {
        return this.type == "zx";
    }

    // 是否是柱状
    get iszz() {
        return this.type == "zz";
    }

    // 是否是条形
    get istx() {
        return this.type == "tx";
    }

    get xAlias() {
        return this.setting.xAlias;
    }

    set xAlias(val) {
        this.setting.xAlias = val;
    }

    get yAlias() {
        return this.setting.yAlias;
    }

    set yAlias(val) {
        this.setting.yAlias = val;
    }

    get height() {
        return this.setting.height;
    }

    set height(val) {
        this.setting.height = val;
    }

    /// 折线图配置
    get lineShape() {
        return this.setting.lineShape || "";
    }

    set lineShape(val) {
        this.setting.lineShape = val;
    }



    /// 柱状图配置
    get zhuzhuangShape() {
        return this.setting.zhuzhuangShape || "";
    }

    set zhuzhuangShape(val) {
        this.setting.zhuzhuangShape = val;
    }

    // 是否为条形
    get isTiaoxingOfzhuzhuang() {
        return this.zhuzhuangShape == "tiaoxing";
    }

    // 是否为圆形
    get isYuanxingOfzhuzhuang() {
        return this.zhuzhuangShape == "yuanxing";
    }

    // 显示类型
    get dodgeOfzhuzhuang() {
        return this.setting.dodgeOfzhuzhuang || "dodge";
    }

    set dodgeOfzhuzhuang(val) {
        this.setting.dodgeOfzhuzhuang = val;
    }



    /// 条形图配置
    
    // 显示类型
    get dodgeOfTiaoxing() {
        return this.setting.dodgeOfTiaoxing || "dodge";
    }

    set dodgeOfTiaoxing(val) {
        this.setting.dodgeOfTiaoxing = val;
    }
}