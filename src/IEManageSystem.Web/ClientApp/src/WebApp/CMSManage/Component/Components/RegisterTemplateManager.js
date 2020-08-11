import React from 'react'
import WebRegisterTemplateParts from './RegisterTemplateParts'
import IocContainer from 'Core/IocContainer'
import {BaseComponent} from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import {PageComponentOSType} from 'BaseCMSManage/Models/Pages/PageComponentModel'
import ComponentFactory, {IInvalidOSComponent} from 'BaseCMSManage/Components/ComponentFactory'
import WebInvalidOSComponent from './InvalidOSComponent'

import NativeRegisterTemplateParts from 'RNCMS/Component/Components/RegisterTemplateParts'
import RNInvalidOSComponent from 'RNCMS/Component/Components/InvalidOSComponent'


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
                    IocContainer.registerSingleIntances(type, single);
                }
            })
        })

        NativeRegisterTemplateParts.forEach(item => {
            item((type, single)=>{
                if(this.isInstanceofBaseComponent(type)){
                    this.nativeComponents.push({type, single});
                }
            })
        })

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
        this.nativeComponents.forEach(item=>{
            IocContainer.registerSingleIntances(item.type, undefined);
        });
        this.webComponents.forEach(item=>{
            IocContainer.registerSingleIntances(item.type, item.single);
        });
        this.curOS = PageComponentOSType.Web;

        IocContainer.registerSingleIntances(IInvalidOSComponent, <WebInvalidOSComponent />);
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

        IocContainer.registerSingleIntances(IInvalidOSComponent, <RNInvalidOSComponent />);
        ComponentFactory.reLoad();
    }
}

const registerTemplateManager = new RegisterTemplateManager();
export default registerTemplateManager;