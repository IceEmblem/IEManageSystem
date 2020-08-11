import WebRegisterTemplateParts from './RegisterTemplateParts'
import NativeRegisterTemplateParts from 'RNCMS/Component/Components/RegisterTemplateParts'
import IocContainer from 'Core/IocContainer'
import {BaseComponent} from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import {PageComponentOSType} from 'BaseCMSManage/Models/Pages/PageComponentModel'
import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'


class RegisterTemplateManager {
    // 目前只有 web端 有工具组件
    toolsComponents = [];
    webComponents = [];
    nativeComponents = [];
    curOS;

    constructor(){
        this.init = this.init.bind(this);
        this.applyOSComponents = this.applyOSComponents.bind(this);
        this.applyWebComponents = this.applyWebComponents.bind(this);
        this.applyNativeComponents = this.applyNativeComponents.bind(this);
    }

    isInstanceofBaseComponent(type){
        if(type == BaseComponent){
            return true;
        }

        if(type.__proto__){
            return this.isInstanceofBaseComponent(type.__proto__)
        }

        return false;
    }

    init(){
        WebRegisterTemplateParts.forEach(item => {
            item((type, single)=>{
                if(this.isInstanceofBaseComponent(type)){
                    this.webComponents.push({type, single});
                }
                else{
                    this.toolsComponents.push({type, single});
                }
                IocContainer.registerSingleIntances(type, single);
            })
        })
        this.curOS = PageComponentOSType.Web;

        NativeRegisterTemplateParts.forEach(item => {
            item((type, single)=>{
                if(type instanceof BaseComponent){
                    this.nativeComponents.push({type, single});
                }
            })
        })
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
        this.nativeComponents.forEach(item=>{
            IocContainer.registerSingleIntances(item.type, undefined);
        });
        this.webComponents.forEach(item=>{
            IocContainer.registerSingleIntances(item.type, item.single);
        });
        this.curOS = PageComponentOSType.Web;

        ComponentFactory.reLoad();
    }

    applyNativeComponents(){
        this.webComponents.forEach(item=>{
            IocContainer.registerSingleIntances(item.type, undefined);
        });
        this.nativeComponents.forEach(item=>{
            IocContainer.registerSingleIntances(item.type, item.single);
        })
        this.curOS = PageComponentOSType.Native;

        ComponentFactory.reLoad();
    }
}

const registerTemplateManager = new RegisterTemplateManager();
export default registerTemplateManager;