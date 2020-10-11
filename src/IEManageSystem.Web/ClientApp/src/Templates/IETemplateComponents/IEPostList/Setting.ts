import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get col(){
        return this.setting.col || 5;
    }

    set col(val){
        this.setting.col = val;
    }

    get heigth(){
        return this.setting.heigth;
    }

    set heigth(val){
        this.setting.heigth = val;
    }

    get isShowImg(){
        return this.setting.isShowImg == undefined ? true : this.setting.isShowImg;
    }

    set isShowImg(val){
        this.setting.isShowImg = val;
    }

    get hiddenSortBtn(){
        return this.setting.hiddenSortBtn == undefined ? false : this.setting.hiddenSortBtn;
    }

    set hiddenSortBtn(val){
        this.setting.hiddenSortBtn = val;
    }
    
    get hiddenPageing(){
        return this.setting.hiddenPageing == undefined ? false : this.setting.hiddenPageing;
    }

    set hiddenPageing(val){
        this.setting.hiddenPageing = val;
    }
}