export const InteractiveComponentConfigName = '__ICC__';

export default class InteractiveType {
    title = undefined;
    fieldName = undefined;
    getInteractivConfigFeatureItems = undefined;

    constructor(title, fieldName){
        this.title = title;
        this.fieldName = fieldName;
    }

    setConfigFeatureItemName = (pageComponent, interactivConfigFeatureItemName) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        // pageComponentSettingData.field1 = interactivConfigFeatureItemName;
        pageComponentSettingData[this.fieldName] = interactivConfigFeatureItemName;
    }

    getConfigFeatureItemName = (pageComponent) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        // return pageComponentSettingData.field1;
        return pageComponentSettingData[this.fieldName];
    }

    setComponentPropsData = (pageComponent, interactivConfigFeature, componentProps) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        
        if(!pageComponentSettingData[this.fieldName]){
            return;
        }
        
        componentProps[this.fieldName] = interactivConfigFeature.getData(pageComponentSettingData[this.fieldName])
    }

    static text(title = "使用的文本", fieldName = "interactivText") {
        return new TextInteractiveType(title, fieldName);
    }

    static click(title = "使用的点击", fieldName = "interactivClick") {
        return new ClickInteractiveType(title, fieldName);
    }

    static url(title = "使用的Url", fieldName = "interactivUrl") {
        return new UrlInteractiveType(title, fieldName);
    }

    static input(title = "使用的文本框", fieldName = "interactivInput") {
        return new InputInteractiveType(title, fieldName);
    }
}

export class TextInteractiveType extends InteractiveType{
    getInteractivConfigFeatureItems = (interactivConfigFeature) => {
        return interactivConfigFeature.getTexts();
    }
}

export class ClickInteractiveType extends InteractiveType {
    getInteractivConfigFeatureItems = (interactivConfigFeature) => {
        return interactivConfigFeature.getClicks();
    }
}

export class UrlInteractiveType extends InteractiveType {
    getInteractivConfigFeatureItems = (interactivConfigFeature) => {
        return interactivConfigFeature.getUrls();
    }
}

export class InputInteractiveType extends InteractiveType {
    getInteractivConfigFeatureItems = (interactivConfigFeature) => {
        return interactivConfigFeature.getInputs();
    }
}