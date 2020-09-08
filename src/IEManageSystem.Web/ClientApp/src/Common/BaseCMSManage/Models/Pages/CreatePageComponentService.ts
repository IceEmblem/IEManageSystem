class CreatePageComponentService{
    createComponent(sign:string, name:string, os: string)
    {
        return {
            id: 0,
            sign: sign,
            name: name,
            parentSign: null,
            group: null,
            os: os,
            pageComponentBaseSetting: {
                id: 0,
                sortIndex: 0,
                width: '100%',
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
            componentTypes: 0,
            pageComponentSettings: []
        };
    }
}

const service = new CreatePageComponentService();

export default service;