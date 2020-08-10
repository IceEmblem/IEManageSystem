class CreatePageComponentService{
    private createComponent(sign:string, name:string, componentType:string)
    {
        return {
            id: 0,
            sign: sign,
            name: name,
            parentSign: null,
            os: null,
            pageComponentBaseSetting: {
                id: 0,
                sortIndex: 0,
                width: null,
                height: null,
                padding: null,
                margin: null,
                backgroundColor: null,
                backgroundImage: null,
                className: null,
            },
            pageLeafSetting: {
                pageName: "",
                pageSize: 10,
                top: 0,
                searchKey: "",
            },
            menuName: null,
            componentType: componentType,
            pageComponentSettings: []
        };
    }

    createCompositeComponent(sign:string, name:string)
    {
        return this.createComponent(sign, name, "CompositeComponent")
    }

    createLeafComponent(sign:string, name:string)
    {
        return this.createComponent(sign, name, "LeafComponent")
    }

    createPageLeafComponent(sign:string, name:string)
    {
        return this.createComponent(sign, name, "PageLeafComponent")
    }

    createMenuComponent(sign:string, name:string)
    {
        return this.createComponent(sign, name, "MenuComponent")
    }
}

const service = new CreatePageComponentService();

export default service;