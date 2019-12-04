var moduleDatas = [];

export default class ModuleFactory
{
    register(module, name, dependModuleNames)
    {
        moduleDatas.push({
            name: name,
            module: module,
            dependModuleNames: dependModuleNames,
            isPreInit: false,
            isInit: false,
            isPostInit: false
        })
    }

    init(){
        for(let n = 0; n < moduleDatas.length; n++)
        {
            this.preInitialize(moduleDatas[n]);
        }

        for(let n = 0; n < moduleDatas.length; n++)
        {
            this.initialize(moduleDatas[n]);
        }

        for(let n = 0; n < moduleDatas.length; n++)
        {
            this.postInitialize(moduleDatas[n]);
        }
    }

    preInitialize(moduleData)
    {
        if(moduleData.dependModuleNames)
        {
            for(let n = 0; n < moduleData.dependModuleNames.length; n++){
                let dependModuleData = moduleDatas.find(item=>item.name == moduleData.dependModuleNames[n]);
                this.preInitialize(dependModuleData)
            }
        }

        if(moduleData.isPreInit){
            return;
        }

        moduleData.isPreInit = true;

        moduleData.module.preInitialize();
    }

    initialize(moduleData)
    {
        if(moduleData.dependModuleNames)
        {
            for(let n = 0; n < moduleData.dependModuleNames.length; n++){
                let dependModuleData = moduleDatas.find(item=>item.name == moduleData.dependModuleNames[n]);
                this.initialize(dependModuleData)
            }
        }

        if(moduleData.isInit){
            return;
        }

        moduleData.isInit = true;

        moduleData.module.initialize();
    }

    postInitialize(moduleData)
    {
        if(moduleData.dependModuleNames)
        {
            for(let n = 0; n < moduleData.dependModuleNames.length; n++){
                let dependModuleData = moduleDatas.find(item=>item.name == moduleData.dependModuleNames[n]);
                this.postInitialize(dependModuleData)
            }
        }

        if(moduleData.isPostInit){
            return;
        }

        moduleData.isPostInit = true;

        moduleData.module.postInitialize();
    }
}