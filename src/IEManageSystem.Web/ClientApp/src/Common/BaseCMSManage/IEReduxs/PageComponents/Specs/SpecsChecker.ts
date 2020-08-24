import ISpec from './ISpec'
import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'
import SpecResult from './SpecResult'
import RNSpec from './RNSpec'

class SpecsChecker{
    specs : ISpec[] = [new RNSpec()];

    // 是否适用于所有规格
    isSuitAllSpecs(pageComponent: PageComponentModel):SpecResult{
        for(let n = 0; n < this.specs.length; n++){
            let result = this.specs[n].check(pageComponent);
            if(result.isPass == false){
                return result;
            }
        }

        return {isPass: true, message: null}
    }
}

const specsChecker = new SpecsChecker();
export default specsChecker;