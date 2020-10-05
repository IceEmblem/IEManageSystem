import { List } from "native-base";


interface ContentPagePermission {
    id: number;
    permissionId: number;
    isManage: boolean;
}

export default class ContentPagePermissionCollection {
    isEnableQueryPermission: boolean;
    pageName: string;
    contentPagePermissions: ContentPagePermission[]

    constructor(pageName){
        this.isEnableQueryPermission = false;
        this.pageName = pageName;
        this.contentPagePermissions = [];
    }
}