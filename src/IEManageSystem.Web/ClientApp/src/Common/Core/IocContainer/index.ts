
// 为了提供性能，IocContainer 要求每个 keyType 必须提供一个 静态属性 iocKey
// 当前 IocContainer 不支持依赖关联
class IocContainer {
    intances: Map<string, any> = new Map<string, any>();
    
    singles: Map<string, ()=>any> = new Map<string, ()=>any>();
    transients: Map<string, ()=>any> = new Map<string, ()=>any>();

    constructor(){
        this.registerSingle = this.registerSingle.bind(this);
        this.registerSingleIntances = this.registerSingleIntances.bind(this);
        this.registerTransient = this.registerTransient.bind(this);
    }

    registerSingle(keyType: any, valueBuilder: ()=>any){
        if(!keyType.iocKey){
            throw new Error(`IocContainer 注册失败，类型 ${keyType} 没有提供静态属性 iocKey`)
        }

        this.singles[keyType.iocKey] = valueBuilder;
    }

    registerSingleIntances(keyType: any, value: any){
        if(!keyType.iocKey){
            throw new Error(`IocContainer 注册失败，类型 ${keyType} 没有提供静态属性 iocKey`)
        }

        this.intances[keyType.iocKey] = value;
    }

    registerTransient(keyType: any, valueBuilder: ()=>any){
        if(!keyType.iocKey){
            throw new Error(`IocContainer 注册失败，类型 ${keyType} 没有提供静态属性 iocKey`)
        }

        this.transients[keyType.iocKey] = valueBuilder;
    }

    // 获取服务
    getService(keyType: any){
        let intance = this.intances[keyType.iocKey];
        if(intance){
            return intance;
        }

        let singleBuilder = this.singles[keyType.iocKey];
        if(singleBuilder){
            this.intances[keyType.iocKey] = singleBuilder();
            return this.intances[keyType.iocKey];
        }

        let transientBuilder = this.transients[keyType.iocKey];
        if(transientBuilder){
            return transientBuilder();
        }

        return null;
    }
}

const iocContainer = new IocContainer();
export default iocContainer;