import PageComponentModel, {PageComponentOSType} from 'BaseCMSManage/Models/Pages/PageComponentModel'
import ISpec from './ISpec'
import SpecResult from './SpecResult'

export default class RNSpec implements ISpec {
    // 数字或者%
    static numOrPercentage = /^[0-9]+?[\%]?$/
    static num = /^[0-9]+?$/
    private checkBaseSetting(pageComponent: PageComponentModel): SpecResult
    {
        let pageComponentBaseSetting = pageComponent.pageComponentBaseSetting;
        if(pageComponentBaseSetting.width && !RNSpec.numOrPercentage.test(pageComponentBaseSetting.width)){
            return {isPass: false, message: "宽度必须是数字或者%"};
        }

        if(pageComponentBaseSetting.height && !RNSpec.numOrPercentage.test(pageComponentBaseSetting.height)){
            return {isPass: false, message: "高度必须是数字或者%"};
        }

        if(pageComponentBaseSetting.padding && !RNSpec.num.test(pageComponentBaseSetting.padding)){
            return {isPass: false, message: "内边距必须是数字"};
        }

        if(pageComponentBaseSetting.margin && !RNSpec.num.test(pageComponentBaseSetting.margin)){
            return {isPass: false, message: "外边距必须是数字"};
        }

        return {isPass: true, message: null};
    }

    check(pageComponent: PageComponentModel):SpecResult{
        if(pageComponent.os != PageComponentOSType.Native){
            return {isPass: true, message: null};
        }

        let result:SpecResult;
        result = this.checkBaseSetting(pageComponent);
        if(result.isPass == false){
            return result;
        }

        return {isPass: true, message: null};
    }
}