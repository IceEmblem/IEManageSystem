import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get height(){
        return this.setting.height;
    }

    set height(val){
        this.setting.height = val;
    }

    get width(){
        return this.setting.width;
    }

    set width(val){
        this.setting.width = val;
    }

    get padding(){
        return this.setting.padding;
    }

    set padding(val){
        this.setting.padding = val;
    }

    get margin(){
        return this.setting.margin;
    }

    set margin(val){
        this.setting.margin = val;
    }

    get style(){
        return this.setting.style;
    }

    set style(val){
        this.setting.style = val;
    }

    toStyle(){
        let style : any = {};

        if(this.height){
            style.height = this.height;
        }

        if(this.width){
            style.width = this.width;
        }

        if(this.padding){
            style.padding = this.padding;
        }

        if(this.margin){
            style.margin = this.margin;
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