import DataElement from './DataElement.js';

export default class DataElementFactory
{
	constructor(dataElementHtmlBoot)
	{
		this.dataElementBoot = new DataElement(dataElementHtmlBoot);

		let dataElementList = new Array();

		let dataElementHtmls = dataElementHtmlBoot.find("[data-element=dataElement]");

		let tempDataElementList = new Array();
		
		// 获取数据元素列表
		for(let n=0; n<dataElementHtmls.length; n++)
		{
			let curHtmlElement = dataElementHtmls.eq(n);
			let dataElement = new DataElement(curHtmlElement);

			tempDataElementList.push(dataElement);
		}
		
		for(let n=0; n<tempDataElementList.length; n++){
			let curDataElement = tempDataElementList[n];

			if(curDataElement.dataParentId == undefined){
				dataElementList.push(curDataElement);
			}
			
			// 如果当前元素是父元素
			if(curDataElement.dataIsParent == "true")
			{
				// 获取其下的所有子元素
				let childs = curDataElement.dataElementHtml.find("[data-element=dataElement]");
				for(let p = 0; p<childs.length; p++)
				{
					let parentName = childs.eq(p).attr("data-p-n");
					
					if(curDataElement.dataName.length > 0){
						// 如果
						if(parentName == curDataElement.dataName[curDataElement.dataName.length-1])
						{	
							// 配置关系
							let childId = childs.eq(p).attr("data-id");
							
							let childElement = null;
							for(let m=0; m<tempDataElementList.length; m++){
								if(tempDataElementList[m].id == childId){
									childElement = tempDataElementList[m];
									childElement.dataParentId = curDataElement.id;
									childElement.dataParent = curDataElement;
									break;
								}
							}
							
							if(childElement != null){
								curDataElement.dataElementChildList.push(childElement);
							}
						}
					}
					
				}
			}
			
			// // 生成元素字符串
			// let clone = curDataElement.dataElementHtml.clone();
			// if(curDataElement.dataIsParent == "true"){
			// 	// 获取其下的所有子元素
			// 	let childs = clone.find("[data-element=dataElement]");
			// 	for(let p = 0; p<childs.length; p++){
			// 		let childDataParentName = childs.eq(p).attr("data-parent-name");
			// 		if(childDataParentName == curDataElement.dataName){
			// 			childs.eq(p).attr("data-parent-Id", curDataElement.id);
			// 			childs.eq(p).html("");
			// 		}
			// 	}
			// }
			// curDataElement.dataElementChildsHtmlStr = clone.html();
		}

		for(let n=0; n < dataElementList.length; n++){
			let childElement = dataElementList[n];

			childElement.dataParentId = this.dataElementBoot.id;
			childElement.dataParent = this.dataElementBoot;

			this.dataElementBoot.dataElementChildList.push(childElement);
			this.dataElementBoot.dataElementChildsHtmlStr = this.dataElementBoot.dataElementHtml.html();
		}
	}

	GetDataElementBoot(){
		return this.dataElementBoot;
	}

	ForeachDataElement(dataId, dataElement)
	{
		if(dataElement.id == dataId){
			return dataElement;
		}
		for(let n=0; n< dataElement.dataElementChildList.length; n++)
		{
			let result = this.ForeachDataElement(dataId, dataElement.dataElementChildList[n]);
			if(result != null){
				return result;
			}
		}

		return null;
	}

	GetDataElement(dataElementHtml)
	{
		let dataId = dataElementHtml.attr("data-id");
		
		return this.ForeachDataElement(dataId, this.dataElementBoot)
	}

	GetDataElementForId(id)
	{
		return this.ForeachDataElement(id, this.dataElementBoot)
	}
}