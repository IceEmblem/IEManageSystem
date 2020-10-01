class CreatePageComponentService {
    createComponent(sign: string, name: string, os: string, pageComponentBaseSetting: any = {}) {
        return {
            sign: sign,
            name: name,
            parentSign: null,
            group: null,
            os: os,
            pageComponentBaseSetting: {
                ...{
                    sortIndex: 0,
                    width: '100%',
                    height: null,
                    padding: null,
                    margin: null,
                    backgroundColor: null,
                    backgroundImage: null,
                    className: null,
                },
                ...pageComponentBaseSetting
            },
            pageLeafSetting: {
                pageName: "",
                pageSize: 10,
                top: 0,
                searchKey: "",
            },
            menuName: null,
            pageComponentSettings: []
        };
    }
}

const service = new CreatePageComponentService();

export default service;