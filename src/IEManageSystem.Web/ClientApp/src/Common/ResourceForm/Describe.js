// Describe[{  字段描述（供Resource组件使用的描述）
// 	text:"",  描述显示文本
// 	name:"",  描述名称
// 	isId=true,  是否是Id字段
// 	isName=true,  是否是名称字段
// 	valueType="",  字段类型
// 	valueTexts=[{value:"", text:""}],  如果字段为单选或复选时需指定
//	col=12  网格长度
//  isEdit=true,  是否可以编辑
// }]
export default class Describe{
    constructor(externalDescribes) {
        this.text = externalDescribes.text;
        this.name = externalDescribes.name;
        this.isId = externalDescribes.isId;
        this.isName = externalDescribes.isName;
        this.valueType = externalDescribes.valueType;
        this.valueTexts = externalDescribes.valueTexts;
        this.col = externalDescribes.col;
        this.isEdit = true;
    }
}