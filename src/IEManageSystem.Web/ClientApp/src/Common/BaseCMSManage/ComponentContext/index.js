// 上下文使用的特征与ioc类型一致
export default class ComponentContext {
    _features = new Map();

    // 获取特性
    get(TFeature){
        return this._features[TFeature.iocKey];
    }
    
    // 设置特性的实例
    set(TFeature, instance){
        if(instance == undefined){
            this._features.delete(TFeature.iocKey);
        }
        else{
            this._features[TFeature.iocKey] = instance;
        }
    }
}

ComponentContext.current = undefined;