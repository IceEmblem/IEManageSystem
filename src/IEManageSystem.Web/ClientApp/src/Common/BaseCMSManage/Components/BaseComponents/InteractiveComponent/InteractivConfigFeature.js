export class InteractivConfigFeatureTextItem {
    name = undefined;
    displayName = undefined;
    // (data) => string
    getData = undefined;

    constructor(name, displayName, getData){
        this.name = name;
        this.displayName = displayName;
        this.getData = getData;
    }
}

export class InteractivConfigFeatureUrlItem {
    name = undefined;
    displayName = undefined;
    // (data) => string
    getData = undefined;

    constructor(name, displayName, getData){
        this.name = name;
        this.displayName = displayName;
        this.getData = getData;
    }
}

export class InteractivConfigFeatureClickItem {
    name = undefined;
    displayName = undefined;
    // (data) => return () => void;
    getData = undefined;

    constructor(name, displayName, getData){
        this.name = name;
        this.displayName = displayName;
        this.getData = getData;
    }
}

export class InteractivConfigFeatureInputItem {
    name = undefined;
    displayName = undefined;
    // (data) => return (value) => void;
    getData = undefined;

    constructor(name, displayName, getData){
        this.name = name;
        this.displayName = displayName;
        this.getData = getData;
    }
}

export default class InteractivConfigFeature {
    _items = undefined;
    data = undefined;

    constructor(items, data){
        this._items = {};
        items.forEach(item=>{
            this._items[item.name] = item;
        });

        this.data = data;
    }

    getData(name){
        return this._items[name].getData(this.data);
    }

    getClicks(){
        return Object.values(this._items).filter(e=>e instanceof InteractivConfigFeatureClickItem);
    }

    getTexts(){
        return Object.values(this._items).filter(e=>e instanceof InteractivConfigFeatureTextItem);
    }

    getUrls(){
        return Object.values(this._items).filter(e=>e instanceof InteractivConfigFeatureUrlItem);
    }
    
    getInputs(){
        return Object.values(this._items).filter(e=>e instanceof InteractivConfigFeatureInputItem);
    }
}

InteractivConfigFeature.iocKey = Symbol();