import PageComponentModel, {PageComponentOSType} from 'BaseCMSManage/Models/Pages/PageComponentModel'
import ISpec from './ISpec'
import SpecResult from './SpecResult'

export default class RNSpec implements ISpec {
    check(pageComponent: PageComponentModel):SpecResult{
        let pageComponentBaseSetting = pageComponent.pageComponentBaseSetting;
        if(pageComponentBaseSetting.style){
            try{
                JSON.parse(pageComponentBaseSetting.style);
            }
            catch(ex){
                return {isPass: false, message: "样式格式错误：" + ex.message};
            }
        }

        return {isPass: true, message: null};
    }
}