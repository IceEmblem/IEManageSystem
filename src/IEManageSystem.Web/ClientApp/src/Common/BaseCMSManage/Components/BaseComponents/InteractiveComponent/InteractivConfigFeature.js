export class InteractivConfigFeatureTextItem {
    name = undefined;
    displayName = undefined;
    getText = undefined;

    constructor(name, displayName, getText){
        this.name = name;
        this.displayName = displayName;
        this.getText = getText;
    }
}

export class InteractivConfigFeatureClickItem {
    name = undefined;
    displayName = undefined;
    getClick = undefined;

    constructor(name, displayName, getClick){
        this.name = name;
        this.displayName = displayName;
        this.getClick = getClick;
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

    getText(name){
        return this._items[name].getText(this.data);
    }

    getClick(name){
        return this._items[name].getClick(this.data);
    }

    getClicks(){
        return Object.values(this._items).filter(e=>e instanceof InteractivConfigFeatureClickItem);
    }

    getTexts(){
        return Object.values(this._items).filter(e=>e instanceof InteractivConfigFeatureTextItem);
    }
}

InteractivConfigFeature.iocKey = Symbol();