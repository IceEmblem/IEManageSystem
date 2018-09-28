import $ from 'jquery';
import DataElementFactory from './DataElementFactory.js';

var dataElementFactoryList = new Array();
var factoryNum = 0;

// 时间格式化
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
    }
    return fmt; 
} 

// 获取数据元素对应的值
function GetDataElementValue(curDataElement,values)
{
	// if(curDataElement.dataParentId != undefined){
	// 	let parent = curDataElement.GetParentDataElement();
	// 	let value = GetDataElementValue(parent,values);
	// }
	if(curDataElement.dataName.length == 0)
	{
		return values;
	}
	else{
		let value = values;
		for(let item in curDataElement.dataName){
			var itemName = curDataElement.dataName[item];
			// 约定 "" 为取整个元素的值

			if(itemName != ""){
				value = value[itemName];
				if(value == undefined){
					console.warn("未找到数据["+itemName+"]");
					break;
				}
			}
		}

		return value;
	}
}

// value 当前元素的值
// curElement 当前元素对象
// curHtmlElement 当前元素对应的html
// dataElementFactory 当前元素对象对应的元素工厂
// 生成数据元素的值
function CreateDataElementValue(value, curElement, curHtmlElement, dataElementFactory)
{
	curHtmlElement.html("");						// 清空数据元素的内容

	if(curElement.dataIsParent == "true"){		// 如果是父元素
		if(curElement.dataIsList == "true"){		// 如果是数据列表

			let dataElementChildHtmlStr = curElement.dataElementChildsHtmlStr;		// 获取数据元素的字符串
			let dataId = curHtmlElement.attr("data-id");			// 获取数据元素的Id
			
			if( value != null && value != undefined){
				// 循环数据元素的值
				for(let n =0 ; n<value.length ; n++){			
					let dataElementChildHtml = $(dataElementChildHtmlStr);		// 生成数据元素的子元素
					curHtmlElement.append(dataElementChildHtml);			// 追加子元素到数据元素
					let childs = new Array();				// 数据子元素列表

					for(let m=0; m<curElement.dataElementChildList.length; m++)
					{
						let curChlidDataElement = curElement.dataElementChildList[m];
						let curDataElementHtml = curHtmlElement.find("[data-id="+curChlidDataElement.id+"]").last();

						childs.push( { DataElement:curChlidDataElement, DataElementHtml:curDataElementHtml });
					}

					// 循环子元素，生成数据元素的值
					for(let m = 0; m<childs.length; m++)
					{
						let curChlidElement = childs[childs.length-1-m];

						curChlidElement.DataElement.dataElementChildsHtmlStr = curChlidElement.DataElementHtml.html();

						let childvalue = GetDataElementValue(curChlidElement.DataElement, value[n]);			// 获取数据元素对应的值

						CreateDataElementValue(childvalue, curChlidElement.DataElement, curChlidElement.DataElementHtml, dataElementFactory);
					}
				}
			}
		}
		else{		// 如果不是数据列表
			curHtmlElement.append(curElement.dataElementChildsHtmlStr);			// 追加子元素到数据元素

			let childs = new Array();				// 数据子元素列表

			for(let m=0; m<curElement.dataElementChildList.length; m++)
			{
				let curChlidDataElement = curElement.dataElementChildList[m];
				let curDataElementHtml = curHtmlElement.find("[data-id="+curChlidDataElement.id+"]").eq(0);

				childs.push( { DataElement:curChlidDataElement, DataElementHtml:curDataElementHtml });
			}
			
			if( value != null && value != undefined){
				// 循环子元素，生成数据元素的值
				for(let m = 0; m<childs.length; m++)
				{
					let curChlidElement = childs[childs.length-1-m];
					
					curChlidElement.DataElement.dataElementChildsHtmlStr = curChlidElement.DataElementHtml.html();

					let childvalue = GetDataElementValue(curChlidElement.DataElement, value);

					CreateDataElementValue(childvalue, curChlidElement.DataElement, curChlidElement.DataElementHtml, dataElementFactory);
				}
			}
		}
	}
	else{
		if(curElement.dataNullHide == "true" && (value == null || value == undefined || value=="")){		// 如果值为空且html需要删除
			curHtmlElement.remove();
		}
		else{
			curHtmlElement.append(curElement.dataElementChildsHtmlStr);			// 追加子元素到数据元素

			if(curElement.dataType == "date")		// 如果类型为日期类型
			{
				value = (new Date(value)).format("yyyy-MM-dd");
			}
			let str = curHtmlElement[0].outerHTML;
			let idn = curHtmlElement.attr("data-idn");

			var reg = new RegExp( "{{Value}}" , "g" )
			//curHtmlElement.html("");
			if(value == null || value == ""){
				str = str.replace(reg, "");
			}
			else{
				str = str.replace(reg, value);
			}
			if(idn != undefined){
				str = str.replace(reg, idn);
			}
			$(str).replaceAll(curHtmlElement);
		}
	}		
}

// 生成数据
export function BuildData(data, element)
{
	let dataElementFactory = new DataElementFactory(element);

	dataElementFactoryList.push({ id:factoryNum, factory:dataElementFactory });
	let factoryId = factoryNum;

	factoryNum++;
	
	let dataElementBoot = dataElementFactory.GetDataElementBoot();

	CreateDataElementValue(data, dataElementBoot, dataElementBoot.dataElementHtml, dataElementFactory);

	return factoryId;
}


export function ReloadData(data, element, factoryId)
{
	let dataElementFactory = null;

	for(let n=0; n<dataElementFactoryList.length; n++)
	{
		if(dataElementFactoryList[n].id == factoryId){
			dataElementFactory = dataElementFactoryList[n].factory;
			break;
		}
	}

	if(dataElementFactory == null){
		console.log("未找到factoryId");
		return;
	}
	
	let dataElementBoot = null;
	if(element == null && element == undefined){
		dataElementBoot = dataElementFactory.GetDataElementBoot();
	}
	else{
		let dataid = element.attr("data-id");
		dataElementBoot = dataElementFactory.GetDataElementForId(dataid);
		dataElementBoot.dataElementHtml = element;
	}

	dataElementBoot.dataElementHtml.html("");

	dataElementBoot.dataElementHtml.append(dataElementBoot.dataElementChildsHtmlStr);

	CreateDataElementValue(data, dataElementBoot, dataElementBoot.dataElementHtml, dataElementFactory);

	return factoryId;
}

export function AppendData(data, element, factoryId){
	let dataElementFactory = null;

	for(let n=0; n<dataElementFactoryList.length; n++)
	{
		if(dataElementFactoryList[n].id == factoryId){
			dataElementFactory = dataElementFactoryList[n].factory;
			break;
		}
	}

	if(dataElementFactory == null){
		console.log("未找到factoryId");
		return;
	}
	
	let dataElementBoot = null;
	if(element == null && element == undefined){
		dataElementBoot = dataElementFactory.GetDataElementBoot();
	}
	else{
		let dataid = element.attr("data-id");
		dataElementBoot = dataElementFactory.GetDataElementForId(dataid);
		dataElementBoot.dataElementHtml = element;
	}

	let clone = dataElementBoot.dataElementHtml.clone();

	clone.html("");

	clone.append(dataElementBoot.dataElementChildsHtmlStr);

	CreateDataElementValue(data, dataElementBoot, clone, dataElementFactory);

	dataElementBoot.dataElementHtml.append(clone.html());

	return factoryId;
}