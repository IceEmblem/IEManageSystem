import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get height(){
        return this.setting.getDefauleData().field1;
    }

    set height(val){
        this.setting.getDefauleData().field1 = val;
    }

    get width(){
        return this.setting.getDefauleData().field2;
    }

    set width(val){
        this.setting.getDefauleData().field2 = val;
    }

    get padding(){
        return this.setting.getDefauleData().field3;
    }

    set padding(val){
        this.setting.getDefauleData().field3 = val;
    }

    get margin(){
        return this.setting.getDefauleData().field4;
    }

    set margin(val){
        this.setting.getDefauleData().field4 = val;
    }

    get style(){
        return this.setting.getDefauleData().field5;
    }

    set style(val){
        this.setting.getDefauleData().field5 = val;
    }

    toStyle(){
        let style = {
            height: this.height,
            width: this.width,
            padding: this.padding,
            margin: this.margin,
        }

        if(this.style){
            let customizeStyle = {};
            
            try{
                customizeStyle = JSON.parse(this.style);
            }
            catch(ex){
                console.error('自定义样式错误\n' + ex.message);
            }

            style = {...style, ...customizeStyle};
        }

        return style;
    }
}