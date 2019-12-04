import Describe from "../ResourceForm/Describe.js";
import {ResourceDescribeValueType} from '../ResourceForm/ResourceDescribeValueType.js';

export default class ResourceDescribe
{
	// externalDescribes [{  字段描述（由外部传入的描述）
	// 	text:"",  描述显示文本
	// 	name:"",  描述名称
	// 	isShowOnList=false,  是否显示在列表上 
	// 	isAddShow=true,  是否显示在添加上
	//	isAddCanEdit=true,  添加时是否允许编辑
	//	isEditShow=true,  是否显示在编辑上
	//	isEditCanEdit=true,  编辑时是否允许编辑
	//	isLookupShow=true,  是否显示在查看上
	// 	isId=true,  是否是Id字段
	// 	isName=true,  是否是名称字段
	// 	valueType="",  字段类型	ResourceDescribeValueType
	// 	valueTexts=[{value:"", text:""}],  如果字段为单选或复选时需指定
	//	col=12  网格长度
	// }]
	constructor(externalDescribes){
		this.externalDescribes = externalDescribes;
		this.idDescribes = null;
		this.nameDescribes = null;

        this._initExternalDescribes();

		for(let item in this.externalDescribes){
			if(this.externalDescribes[item].isId === true){
				this.idDescribes = this.externalDescribes[item];
				break;
			}
		}

		
		for(let item in this.externalDescribes){
			if(this.externalDescribes[item].isName === true){
				this.nameDescribes = this.externalDescribes[item];
				break;
			}
		}
    }

    // 初始化外部描述
    _initExternalDescribes()
    {
        for (let item in this.externalDescribes) {
            if (this.externalDescribes[item].text === undefined) {
                this.externalDescribes[item].text = this.externalDescribes[item].name;
            }

            if (this.externalDescribes[item].isShowOnList === undefined) {
                this.externalDescribes[item].isShowOnList = false;
            }

            if (this.externalDescribes[item].isAddShow === undefined) {
                this.externalDescribes[item].isAddShow = true;
            }

            if (this.externalDescribes[item].isAddCanEdit === undefined) {
                this.externalDescribes[item].isAddCanEdit = true;
            }

            if (this.externalDescribes[item].isEditShow === undefined) {
                this.externalDescribes[item].isEditShow = true;
            }

            if (this.externalDescribes[item].isEditCanEdit === undefined) {
                this.externalDescribes[item].isEditCanEdit = true;
            }

            if (this.externalDescribes[item].isLookupShow === undefined) {
                this.externalDescribes[item].isLookupShow = true;
            }

            if (this.externalDescribes[item].isId === undefined) {
                this.externalDescribes[item].isId = false;
            }

            if (this.externalDescribes[item].isName === undefined) {
                this.externalDescribes[item].isName = false;
            }

            if (this.externalDescribes[item].valueType === undefined) {
                this.externalDescribes[item].valueType = ResourceDescribeValueType.text;
            }

            if (this.externalDescribes[item].valueTexts === undefined) {
                this.externalDescribes[item].valueTexts = new Array();
            }

            if (this.externalDescribes[item].col === undefined) {
                this.externalDescribes[item].col = 12;
            }
        }
    }

	// 获取显示在列表上的描述
	getDescribesOfList(){
		let describes = new Array();

		for(let item in this.externalDescribes){
            if (this.externalDescribes[item].isShowOnList === true) {
                describes.push(new Describe(this.externalDescribes[item]));
			}
		}

		return describes;
	}

	// 获取显示在添加上的描述
	getDescribesOfAdd(){
		let describes = new Array();

		for(let item in this.externalDescribes){
            if (this.externalDescribes[item].isAddShow === true) {
                let describe = new Describe(this.externalDescribes[item]);
                describe.isEdit = this.externalDescribes[item].isAddCanEdit

                describes.push(describe);
			}
		}

		return describes;
	}

	// 获取显示在编辑上的描述
	getDescribesOfEdit(){
		let describes = new Array();

		for(let item in this.externalDescribes){
            if (this.externalDescribes[item].isEditShow === true) {
                let describe = new Describe(this.externalDescribes[item]);
                describe.isEdit = this.externalDescribes[item].isEditCanEdit;

                describes.push(describe);
			}
		}

		return describes;
	}

	// 获取显示在查看上的描述
	getDescribesOfLookup(){
		let describes = new Array();

		for(let item in this.externalDescribes){
            if (this.externalDescribes[item].isLookupShow === true) {
                let describe = new Describe(this.externalDescribes[item]);
                describe.isEdit = false;
				
                describes.push(describe);
			}
		}

		return describes;
	}

	// 根据名称获取的描述
	getDescribeFormName(name){
		for(let item in this.externalDescribes){
			if(this.externalDescribes[item].name === name){
                return new Describe(this.externalDescribes[item]);
			}
		}

		for(let item in this.externalDescribes){
			var reg = new RegExp("." + name + "$");
			if(reg.text(this.externalDescribes[item].name)){
                return new Describe(this.externalDescribes[item]);
			}
		}

		return null;
	}
}