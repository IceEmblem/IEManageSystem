class CreatePageComponentService {
    createComponent(sign: string, name: string, os: string, pageComponentBaseSetting: any = {}) {
        return {
            sign: sign,
            name: name,
            parentSign: undefined,
            group: undefined,
            os: os,
            pageComponentBaseSetting: {
                ...{
                    sortIndex: 0,
                    width: '100%',
                    height: undefined,
                    padding: undefined,
                    margin: undefined,
                    backgroundColor: undefined,
                    backgroundImage: undefined,
                    className: undefined,
                },
                ...pageComponentBaseSetting
            },
            pageLeafSetting: {
                pageName: "",
                pageSize: 10,
                top: 0,
                searchKey: "",
            },
            menuName: undefined,
            pageComponentSettings: {}
        };
    }
}

const service = new CreatePageComponentService();

export default service;