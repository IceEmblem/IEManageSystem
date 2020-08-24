
import IETool from '../ToolLibrary/IETool'

// 目前 IocContainer 无法支持 map 类型，性能较差
// 当前 IocContainer 不支持依赖关联
class IocContainer {
    intances: Map<string, any> = new Map<string, any>();
    
    singles: Map<string, ()=>any> = new Map<string, ()=>any>();
    transients: Map<string, ()=>any> = new Map<string, ()=>any>();

    keyTypeToSigns = [];

    constructor(){
        this.registerSingle = this.registerSingle.bind(this);
        this.registerSingleIntances = this.registerSingleIntances.bind(this);
        this.registerTransient = this.registerTransient.bind(this);
    }

    registerSingle(keyType: any, valueBuilder: ()=>any){
        let old = this.keyTypeToSigns.find(item => item.keyType == keyType);
        if(old) {
            this.singles[old.sign] = valueBuilder;
            return;
        }

        let sign = IETool.guid();
        this.singles[sign] = valueBuilder;
        this.keyTypeToSigns.push({keyType, sign});
    }

    registerSingleIntances(keyType: any, value: any){
        let old = this.keyTypeToSigns.find(item => item.keyType == keyType);
        if(old) {
            this.intances[old.sign] = value;
            return;
        }

        let sign = IETool.guid();
        this.intances[sign] = value;
        this.keyTypeToSigns.push({keyType, sign});
    }

    registerTransient(keyType: any, valueBuilder: ()=>any){
        let old = this.keyTypeToSigns.find(item => item.keyType == keyType);
        if(old) {
            this.transients[old.sign] = valueBuilder;
            return;
        }

        let sign = IETool.guid();
        this.transients[sign] = valueBuilder;
        this.keyTypeToSigns.push({keyType, sign});
    }

    // 获取服务
    getService(keyType: any){
        let keyTypeToSign = this.keyTypeToSigns.find(item => item.keyType === keyType);
        if(!keyTypeToSign){
            return null;
        }

        let sign = keyTypeToSign.sign;

        let intance = this.intances[sign];
        if(intance){
            return intance;
        }

        let singleBuilder = this.singles[sign];
        if(singleBuilder){
            this.intances[sign] = singleBuilder();
            return this.intances[sign];
        }

        let transientBuilder = this.transients[sign];
        if(transientBuilder){
            return transientBuilder();
        }

        return null;
    }
}

const iocContainer = new IocContainer();
export default iocContainer;