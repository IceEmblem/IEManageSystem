class CreatePageComponentService{
    private createComponent(sign:string, name:string, componentTypes:number)
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
            componentTypes: componentTypes,
            pageComponentSettings: []
        };
    }
}

const service = new CreatePageComponentService();

export default service;