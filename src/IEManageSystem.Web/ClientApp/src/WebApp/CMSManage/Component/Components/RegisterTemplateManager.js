import {PageComponentOSType} from 'BaseCMSManage/Models/Pages/PageComponentModel'
import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import WebInvalidOSComponent from './InvalidOSComponent'
import './BaseComponents'

import RNInvalidOSComponent from 'RNCMS/Component/Components/InvalidOSComponent'

import RNTemplates from './RNTemplates'
import WebTemplates from './WebTemplates'

class RegisterTemplateManager {
    curOS;

    constructor(){
        this.init = this.init.bind(this);
        this.applyOSComponents = this.applyOSComponents.bind(this);
        this.applyWebComponents = this.applyWebComponents.bind(this);
        this.applyNativeComponents = this.applyNativeComponents.bind(this);
    }

    init(){
        this.applyWebComponents();
    }

    applyOSComponents(os) {
        if(this.curOS == os){
            return;
        }

        if(os == PageComponentOSType.Web){
            this.applyWebComponents();
            return;
        }

        if(os == PageComponentOSType.Native){
            this.applyNativeComponents();
            return;
        }

        throw new Error("无效的平台类型");
    }

    applyWebComponents(){
        ComponentFactory.register(WebTemplates, WebInvalidOSComponent);
        this.curOS = PageComponentOSType.Web;
    }

    applyNativeComponents(){
        ComponentFactory.register(RNTemplates, RNInvalidOSComponent);
        this.curOS = PageComponentOSType.Native;
    }
}

const registerTemplateManager = new RegisterTemplateManager();
export default registerTemplateManager;