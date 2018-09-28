var DataElementNum =  0;

export default class DataElement
{
	constructor(dataElementHtml)
	{
		// 当前元素
		this.dataElementHtml = dataElementHtml;
		// 数据名称
		this.dataName = new Array();
		let dataName = dataElementHtml.attr("data-n");
		if(dataName != undefined){
			this.dataName = dataName.split('.');
		}
		// this.dataName = dataElementHtml.attr("data-n");
		// 父元素数据名称
		this.dataParentName = dataElementHtml.attr("data-p-n");
		// 数据类型
		this.dataType = dataElementHtml.attr("data-t");
		// 元素是否隐藏
		this.dataNullHide = dataElementHtml.attr("data-n-h");
		// 是否是父元素
		this.dataIsParent = dataElementHtml.attr("data-iP");
		// 是否是数据列表
		this.dataIsList = dataElementHtml.attr("data-iL");
		if(this.dataIsList == "true"){
			this.dataIsParent = "true";
		}
		// 记录元素Id
		this.id = "DataElement"+DataElementNum;
		DataElementNum++;
		dataElementHtml.attr("data-id", this.id);
		// 父元素Id
		this.dataParentId = undefined;
		// 父元素
		this.dataParent = undefined;
		// 子元素列表
		this.dataElementChildList = new Array();

		this.dataElementChildsHtmlStr = "";
	}

	GetParentDataElement(){
		return this.dataParent;
	}
}