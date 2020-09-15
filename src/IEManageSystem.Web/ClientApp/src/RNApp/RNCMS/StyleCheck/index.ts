
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

export default class StyleCheck {
    static pxRegex = /^([0-9]+?)px$/;
    static numRegex = /^[0-9]+$/
    static percentageRegex = /^[0-9]+%$/

    static readonly handles = {
        fontSize: (style) => {
            let result = undefined;

            result = StyleCheck.pxRegex.exec(style.fontSize);
            if(result){
                style.fontSize = new Number(result[1]).valueOf();
                return;
            }

            style.fontSize = undefined;
        },
        fontWeight: (style) => {
            if(typeof(style.fontWeight) == 'string' && StyleCheck.numRegex.test(style.fontWeight)){
                return;
            }

            style.fontWeight = undefined;
        },
        width: (style) => {
            let result = undefined;

            result = StyleCheck.percentageRegex.exec(style.width);
            if(result){
                return;
            }

            result = StyleCheck.numRegex.exec(style.width);
            if(result){
                style.width = new Number(style.width).valueOf();
                return;
            }
            
            result = StyleCheck.pxRegex.exec(style.width);
            if(result){
                style.width = new Number(result[1]).valueOf();
                return;
            }

            style.width = undefined;
        },
        height: (style) => {
            let result = undefined;

            result = StyleCheck.percentageRegex.exec(style.height);
            if(result){
                return;
            }

            result = StyleCheck.numRegex.exec(style.height);
            if(result){
                style.height = new Number(style.height).valueOf();
                return;
            }
            
            result = StyleCheck.pxRegex.exec(style.height);
            if(result){
                style.height = new Number(result[1]).valueOf();
                return;
            }

            style.height = undefined;
        },
        padding: (style) => {
            let result = undefined;

            result = StyleCheck.pxRegex.exec(style.padding);
            if(result){
                style.padding = new Number(result[1]).valueOf();
                return;
            }

            style.padding = undefined;
        },
        margin: (style) => {
            let result = undefined;

            result = StyleCheck.pxRegex.exec(style.margin);
            if(result){
                style.margin = new Number(result[1]).valueOf();
                return;
            }

            style.margin = undefined;
        },
        backgroundColor: (style) => {
            if(style.backgroundColor){
                return;
            }

            style.backgroundColor = undefined;
        }
    }

    static handle(input: ViewStyle | TextStyle | ImageStyle): any{
        let style = {...input};

        Object.keys(style).forEach(key => {
            if(StyleCheck.handles[key]){
                StyleCheck.handles[key](style);
            }
        })

        return style;
    }
}