import InteractivConfigFeature, {
    InteractivConfigFeatureTextItem,
    InteractivConfigFeatureUrlItem,
    InteractivConfigFeatureClickItem,
    InteractivConfigFeatureInputItem
} from './InteractivConfigFeature'

export const InteractiveComponentConfigName = '__InteractiveComponentConfig__';

export default class InteractiveType {
    title = undefined;
    setConfigFeatureItemName = undefined;
    getConfigFeatureItemName = undefined;
    setComponentPropsData = undefined;
    getInteractivConfigFeatureItems = undefined;

    static text() {
        return new TextInteractiveType();
    }

    static click() {
        return new ClickInteractiveType();
    }

    static url() {
        return new UrlInteractiveType();
    }

    static input() {
        return new InputInteractiveType();
    }
}

export class TextInteractiveType extends InteractiveType{
    title = '使用的文本';
    
    setConfigFeatureItemName = (pageComponent, interactivConfigFeatureItemName) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        pageComponentSettingData.field1 = interactivConfigFeatureItemName;
    }

    getConfigFeatureItemName = (pageComponent) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        return pageComponentSettingData.field1;
    }

    setComponentPropsData = (pageComponent, interactivConfigFeature, componentProps) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        if(!pageComponentSettingData.field1){
            return;
        }
        componentProps.interactivText = interactivConfigFeature.getData(pageComponentSettingData.field1)
    }

    getInteractivConfigFeatureItems = (interactivConfigFeature) => {
        return interactivConfigFeature.getTexts();
    }
}

export class ClickInteractiveType extends InteractiveType {
    title = '使用的点击';
    
    setConfigFeatureItemName = (pageComponent, interactivConfigFeatureItemName) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        pageComponentSettingData.field2 = interactivConfigFeatureItemName;
    }

    getConfigFeatureItemName = (pageComponent) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        return pageComponentSettingData.field2;
    }

    setComponentPropsData = (pageComponent, interactivConfigFeature, componentProps) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        if(!pageComponentSettingData.field2){
            return;
        }
        componentProps.interactivClick = interactivConfigFeature.getData(pageComponentSettingData.field2)
    }

    getInteractivConfigFeatureItems = (interactivConfigFeature) => {
        return interactivConfigFeature.getClicks();
    }
}

export class UrlInteractiveType extends InteractiveType {
    title = '使用的Url';
    
    setConfigFeatureItemName = (pageComponent, interactivConfigFeatureItemName) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        pageComponentSettingData.field3 = interactivConfigFeatureItemName;
    }

    getConfigFeatureItemName = (pageComponent) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        return pageComponentSettingData.field3;
    }

    setComponentPropsData = (pageComponent, interactivConfigFeature, componentProps) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        if(!pageComponentSettingData.field3){
            return;
        }
        componentProps.interactivUrl = interactivConfigFeature.getData(pageComponentSettingData.field3)
    }

    getInteractivConfigFeatureItems = (interactivConfigFeature) => {
        return interactivConfigFeature.getUrls();
    }
}

export class InputInteractiveType extends InteractiveType {
    title = '使用的文本框';
    
    setConfigFeatureItemName = (pageComponent, interactivConfigFeatureItemName) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        pageComponentSettingData.field4 = interactivConfigFeatureItemName;
    }
    
    getConfigFeatureItemName = (pageComponent) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        return pageComponentSettingData.field4;
    }

    setComponentPropsData = (pageComponent, interactivConfigFeature, componentProps) => {
        let pageComponentSettingData = pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        if(!pageComponentSettingData.field4){
            return;
        }
        componentProps.interactivInput = interactivConfigFeature.getData(pageComponentSettingData.field4)
    }

    getInteractivConfigFeatureItems = (interactivConfigFeature) => {
        return interactivConfigFeature.getInputs();
    }
}