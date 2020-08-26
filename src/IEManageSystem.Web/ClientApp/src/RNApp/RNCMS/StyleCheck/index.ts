export default class StyleCheck {
    static pxRegex = /^([0-9]+?)px$/;
    static numRegex = /^[0-9]+$/
    static percentageRegex = /^[0-9]+%$/

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
        if(style.fontSize && typeof(style.fontSize) == 'string'){
            style.fontSize = StyleCheck.pxToNum(style.fontSize);
        }

        if(style.fontWeight){
            if(typeof(style.fontWeight) == 'string' && !StyleCheck.numRegex.test(style.fontWeight)){
                style.fontWeight = '500';
            }
        }

        if(style.width && typeof(style.width) == 'string'){
            if(StyleCheck.percentageRegex.test(style.width)){

            }
            else {
                style.width = StyleCheck.pxToNum(style.width);
            }
        }

        if(style.height && typeof(style.height) == 'string'){
            if(StyleCheck.percentageRegex.test(style.height)){

            }
            else {
                style.height = StyleCheck.pxToNum(style.height);
            }
        }

        if(style.padding && typeof(style.padding) == 'string'){
            style.padding = StyleCheck.pxToNum(style.padding);
        }

        if(style.margin && typeof(style.margin) == 'string'){
            style.margin = StyleCheck.pxToNum(style.margin);
        }

        return style;
    }
}