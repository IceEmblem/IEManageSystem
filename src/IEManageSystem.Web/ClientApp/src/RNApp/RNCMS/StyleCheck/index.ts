
export default class StyleCheck {
    static pxRegex = /^([0-9]+?)px$/;
    static numRegex = /^[0-9]+$/
    static percentageRegex = /^[0-9]+%$/

    static readonly handles = {
        fontSize: (style) => {
            if(typeof(style.fontSize) == 'string'){
                style.fontSize = StyleCheck.pxToNum(style.fontSize);
            }
        },
        fontWeight: (style) => {
            if(typeof(style.fontWeight) == 'string' && !StyleCheck.numRegex.test(style.fontWeight)){
                style.fontWeight = undefined;
            }
        },
        width: (style) => {
            if(typeof(style.width) == 'string' && !StyleCheck.percentageRegex.test(style.width)){
                style.width = StyleCheck.pxToNum(style.width);
            }
        },
        height: (style) => {
            if(typeof(style.height) == 'string' && !StyleCheck.percentageRegex.test(style.height)){
                style.height = StyleCheck.pxToNum(style.height);
            }
        },
        padding: (style) => {
            if(typeof(style.padding) == 'string'){
                style.padding = StyleCheck.pxToNum(style.padding);
            }
        },
        margin: (style) => {
            if(typeof(style.margin) == 'string'){
                style.margin = StyleCheck.pxToNum(style.margin);
            }
        },
        backgroundColor: (style) => {
            if(style.backgroundColor == ''){
                style.backgroundColor = undefined;
            }
        }
    }

    static pxToNum(str: string){
        if(this.numRegex.test(str)){
            return new Number(str).valueOf();
        }

        let result = StyleCheck.pxRegex.exec(str);
        if(result){
            return new Number(result[1]).valueOf();
        }
        
        return undefined;
    }

    static handle(input: any): any{
        let style = {...input};

        Object.keys(style).forEach(key => {
            if(StyleCheck.handles[key]){
                StyleCheck.handles[key](style);
            }
        })

        return style;
    }
}