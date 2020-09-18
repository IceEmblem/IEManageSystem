import * as Themes from '@ant-design/colors';
import IETool from 'Core/ToolLibrary/IETool'

const saveName = '__IEThemeName__';
export const themeName = {
    red: 'red',
    volcano: 'volcano',
    orange: 'orange',
    gold: 'gold',
    yellow: 'yellow',
    lime: 'lime',
    green: 'green',
    cyan: 'cyan',
    blue: 'blue',
    geekblue: 'geekblue',
    purple: 'purple',
    magenta: 'magenta',
    grey: 'grey',
}

class Theme {
    private _currentTheme = Themes.cyan;
    themeName: string = themeName.cyan;

    init(){
        return IETool.getCookie(saveName).then((value)=>{
            if(!value){
                return;
            }

            this.themeName = value;
            if(this.themeName == themeName.blue){
                this._currentTheme = Themes.blue;
                return;
            }
            
            if(this.themeName == themeName.cyan){
                this._currentTheme = Themes.cyan;
                return;
            }
    
            if(this.themeName == themeName.geekblue){
                this._currentTheme = Themes.geekblue;
                return;
            }
    
            if(this.themeName == themeName.gold){
                this._currentTheme = Themes.gold;
                return;
            }
    
            if(this.themeName == themeName.green){
                this._currentTheme = Themes.green;
                return;
            }
    
            if(this.themeName == themeName.grey){
                this._currentTheme = Themes.grey;
                return;
            }
    
            if(this.themeName == themeName.lime){
                this._currentTheme = Themes.lime;
                return;
            }
    
            if(this.themeName == themeName.magenta){
                this._currentTheme = Themes.magenta;
                return;
            }
    
            if(this.themeName == themeName.orange){
                this._currentTheme = Themes.orange;
                return;
            }
    
            if(this.themeName == themeName.purple){
                this._currentTheme = Themes.purple;
                return;
            }
    
            if(this.themeName == themeName.red){
                this._currentTheme = Themes.red;
                return;
            }
    
            if(this.themeName == themeName.volcano){
                this._currentTheme = Themes.volcano;
                return;
            }
    
            if(this.themeName == themeName.yellow){
                this._currentTheme = Themes.yellow;
                return;
            }
        });
    }

    applyDefault() {
        this._currentTheme = Themes.blue;
        this.themeName = themeName.blue;
        IETool.setCookie(saveName, undefined, 0);
    }

    // 应用红色
    applyRed() {
        this._currentTheme = Themes.red;
        this.themeName = themeName.red;
        IETool.setCookie(saveName, themeName.red, 365);
    }

    // 应用火山色
    applyVolcano() {
        this._currentTheme = Themes.volcano;
        this.themeName = themeName.volcano;
        IETool.setCookie(saveName, themeName.volcano, 365);
    }

    // 应用日暮色
    applyOrange() {
        this._currentTheme = Themes.orange;
        this.themeName = themeName.orange;
        IETool.setCookie(saveName, themeName.orange, 365);
    }

    // 应用金盏花
    applyGold() {
        this._currentTheme = Themes.gold;
        this.themeName = themeName.gold;
        IETool.setCookie(saveName, themeName.gold, 365);
    }

    // 应用日出色
    applyYellow() {
        this._currentTheme = Themes.yellow;
        this.themeName = themeName.yellow;
        IETool.setCookie(saveName, themeName.yellow, 365);
    }

    // 应用青柠色
    applyLime() {
        this._currentTheme = Themes.lime;
        this.themeName = themeName.lime;
        IETool.setCookie(saveName, themeName.lime, 365);
    }

    // 应用极光绿色
    applyGreen() {
        this._currentTheme = Themes.green;
        this.themeName = themeName.green;
        IETool.setCookie(saveName, themeName.green, 365);
    }

    // 应用明青色
    applyCyan() {
        this._currentTheme = Themes.cyan;
        this.themeName = themeName.cyan;
        IETool.setCookie(saveName, themeName.cyan, 365);
    }

    // 应用拂晓蓝色
    applyBlue() {
        this._currentTheme = Themes.blue;
        this.themeName = themeName.blue;
        IETool.setCookie(saveName, themeName.blue, 365);
    }

    // 应用极客蓝色
    applyGeekBlue() {
        this._currentTheme = Themes.geekblue;
        this.themeName = themeName.geekblue;
        IETool.setCookie(saveName, themeName.geekblue, 365);
    }

    // 应用酱紫色
    applyPurple(){
        this._currentTheme = Themes.purple;
        this.themeName = themeName.purple;
        IETool.setCookie(saveName, themeName.purple, 365);
    }

    // 应用法式洋红色
    applyMagenta(){
        this._currentTheme = Themes.magenta;
        this.themeName = themeName.magenta;
        IETool.setCookie(saveName, themeName.magenta, 365);
    }

    // 应用灰白色
    applyGrey(){
        this._currentTheme = Themes.grey;
        this.themeName = themeName.grey;
        IETool.setCookie(saveName, themeName.grey, 365);
    }

    get color1() {
        return this._currentTheme[0];
    }

    get color2() {
        return this._currentTheme[1];
    }

    get color3() {
        return this._currentTheme[2];
    }

    get color4() {
        return this._currentTheme[3];
    }

    get color5() {
        return this._currentTheme[4];
    }

    get color6() {
        return this._currentTheme[5];
    }

    get color7() {
        return this._currentTheme[6];
    }

    get color8() {
        return this._currentTheme[7];
    }

    get color9() {
        return this._currentTheme[8];
    }

    get color10() {
        return this._currentTheme[9];
    }

    get primary() {
        return this._currentTheme.primary;
    }
}

export default new Theme();