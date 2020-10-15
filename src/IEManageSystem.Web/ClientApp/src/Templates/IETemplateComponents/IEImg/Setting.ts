import PageComponentSettingModel from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'

export default class Setting {
    public setting: any;

    public constructor(setting:PageComponentSettingModel){
        this.setting = setting;
    }

    get position(){
        return this.setting.position || 'onbottom';
    }

    set position(val){
        this.setting.position = val;
    }

    get imgHeigth(){
        return this.setting.imgHeigth;
    }

    set imgHeigth(val){
        this.setting.imgHeigth = val;
    }

    get imgWidth(){
        return this.setting.imgWidth || '100%';
    }

    set imgWidth(val){
        this.setting.imgWidth = val;
    }
}