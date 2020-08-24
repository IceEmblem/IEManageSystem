import SingleDataModel from "./SingleDataModel";

const defaultDataName = "__default__";

export default abstract class DataCollectionBase {
    public singleDatas: Array<SingleDataModel>;

    // 获取默认数据，不存在则创建
    getDefauleData(): SingleDataModel {
        let defaultData = this.singleDatas.find(e => e.name == defaultDataName);
        if (!defaultData) {
            let sortIndex = this.singleDatas.length == 0 ? 0 : (this.singleDatas[this.singleDatas.length-1].sortIndex + 1);
            defaultData = new SingleDataModel({
                id: 0,
                name: defaultDataName,
                sortIndex: sortIndex
            });
            this.singleDatas.push(defaultData);
        }

        return defaultData;
    }

    createSingleData(name:string){
        let sortIndex = this.singleDatas.length == 0 ? 0 : (this.singleDatas[this.singleDatas.length-1].sortIndex + 1);

        let data = new SingleDataModel({
            id: 0,
            name: name,
            sortIndex: sortIndex
        });
        this.singleDatas.push(data);

        return data;
    }

    deleteSingleData(sortIndex: Number){
        this.singleDatas = this.singleDatas.filter(item=>item.sortIndex != sortIndex);
    }

    getSingleDatas(name:string){
        return this.singleDatas.filter(e=>e.name == name);
    }

    // 获取单个组件数据，不存在则创建
    getOrCreateSingleDate(name:string){
        let single = this.singleDatas.find(item=>item.name == name);
        if(!single){
            this.createSingleData(name);
            single = this.singleDatas.find(item=>item.name == name);
        }
        return single;
    }
}