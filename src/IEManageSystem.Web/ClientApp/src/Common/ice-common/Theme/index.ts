import * as Themes from '@ant-design/colors';
import {IETool} from 'ice-common'

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
    // grey: 'grey',
}

export const allThemeColors = [
    {name: 'red', color: Themes.red.primary},
    {name: 'volcano', color: Themes.volcano.primary},
    {name: 'orange', color: Themes.orange.primary},
    {name: 'gold', color: Themes.gold.primary},
    {name: 'yellow', color: Themes.yellow.primary},
    {name: 'lime', color: Themes.lime.primary},
    {name: 'green', color: Themes.green.primary},
    {name: 'cyan', color: Themes.cyan.primary},
    {name: 'blue', color: Themes.blue.primary},
    {name: 'geekblue', color: Themes.geekblue.primary},
    {name: 'purple', color: Themes.purple.primary},
    {name: 'magenta', color: Themes.magenta.primary},
    // {name: 'grey', color: Themes.grey.primary},
]

class Theme {
    private _currentTheme = Themes.cyan;
    themeName: string = themeName.cyan;

    init(){
        return IETool.getCookie(saveName).then((value)=>{
            if(!value){
                return;
            }

            this.setTheme(value);
        });
    }

    setTheme = (name) => {
        this.themeName = name;

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

        // if(this.themeName == themeName.grey){
        //     this._currentTheme = Themes.grey;
        //     return;
        // }

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

        this._currentTheme = Themes.cyan;
    }

    applyTheme = (name) => {
        IETool.setCookie(saveName, name, 365);
        this.setTheme(name);
    }

    applyDefault = () => {
        this._currentTheme = Themes.cyan;
        this.themeName = themeName.cyan;
        IETool.setCookie(saveName, "", 0);
    }

    // 应用红色
    applyRed = () => {
        this.applyTheme(themeName.red);
    }

    // 应用火山色
    applyVolcano = () => {
        this.applyTheme(themeName.volcano);
    }

    // 应用日暮色
    applyOrange = () => {
        this.applyTheme(themeName.orange);
    }

    // 应用金盏花
    applyGold = () => {
        this.applyTheme(themeName.gold);
    }

    // 应用日出色
    applyYellow = () => {
        this.applyTheme(themeName.yellow);
    }

    // 应用青柠色
    applyLime = () => {
        this.applyTheme(themeName.lime);
    }

    // 应用极光绿色
    applyGreen = () => {
        this.applyTheme(themeName.green);
    }

    // 应用明青色
    applyCyan = () => {
        this.applyTheme(themeName.cyan);
    }

    // 应用拂晓蓝色
    applyBlue = () => {
        this.applyTheme(themeName.blue);
    }

    // 应用极客蓝色
    applyGeekBlue = () => {
        this.applyTheme(themeName.geekblue);
    }

    // 应用酱紫色
    applyPurple = () => {
        this.applyTheme(themeName.purple);
    }

    // 应用法式洋红色
    applyMagenta = () => {
        this.applyTheme(themeName.magenta);
    }

    // // 应用灰白色
    // applyGrey(){
    //     this.applyTheme(themeName.grey);
    // }

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