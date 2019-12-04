class CreatePageComponentService{
    createComponent(sign, name, componentType)
    {
        let pageComponent = {
            sign: sign,
            name: name,
            componentType: componentType
        };

        return pageComponent;
    }

    createCompositeComponent(sign, name)
    {
        return this.createComponent(sign, name, "CompositeComponent")
    }

    createContentLeafComponent(sign, name)
    {
        return this.createComponent(sign, name, "ContentLeafComponent")
    }

    createPageLeafComponent(sign, name)
    {
        return this.createComponent(sign, name, "PageLeafComponent")
    }
}

const service = new CreatePageComponentService();

export default service;