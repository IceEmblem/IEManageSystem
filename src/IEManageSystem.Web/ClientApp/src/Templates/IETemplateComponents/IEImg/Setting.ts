import PageComponentSettingModel from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'

export default class Setting {
    public setting:PageComponentSettingModel;

    public constructor(setting:PageComponentSettingModel){
        this.setting = setting;
    }

    get position(){
        return this.setting.getDefauleData().field1 || 'onbottom';
    }

    set position(val){
        this.setting.getDefauleData().field1 = val;
    }

    get imgHeigth(){
        return this.setting.getDefauleData().field2;
    }

    set imgHeigth(val){
        this.setting.getDefauleData().field2 = val;
    }

    get imgWidth(){
        return this.setting.getDefauleData().field3 || '100%';
    }

    set imgWidth(val){
        this.setting.getDefauleData().field3 = val;
    }
}