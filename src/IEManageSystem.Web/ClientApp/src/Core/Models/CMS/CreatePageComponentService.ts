class CreatePageComponentService{
    private createComponent(sign:string, name:string, componentType:string):PageComponentModel
    {
        let pageComponent:PageComponentModel = {
            id: 0,
            sign: sign,
            name: name,
            parentSign: null,
            col: null,
            height: null,
            padding: null,
            margin: null,
            backgroundColor: null,
            className: null,
            targetPageId: null,
            componentType: componentType,
            pageComponentSettings: []
        };

        return pageComponent;
    }

    createCompositeComponent(sign:string, name:string)
    {
        return this.createComponent(sign, name, "CompositeComponent")
    }

    createContentLeafComponent(sign:string, name:string)
    {
        return this.createComponent(sign, name, "ContentLeafComponent")
    }

    createPageLeafComponent(sign:string, name:string)
    {
        return this.createComponent(sign, name, "PageLeafComponent")
    }
}

const service = new CreatePageComponentService();

export default service;