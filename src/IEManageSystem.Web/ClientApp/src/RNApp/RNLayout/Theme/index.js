import BaseTheme from 'BaseLayout/Theme';
import getTheme from './NativeBaseTheme/components';
import material from './NativeBaseTheme/variables/material';

class Theme {
    init(){
        material.brandPrimary = BaseTheme.primary;
        material.footerDefaultBg = BaseTheme.primary;
        material.tabActiveBgColor = BaseTheme.primary;
        material.toolbarDefaultBg = BaseTheme.primary;
        material.toolbarDefaultBorder = BaseTheme.primary;
        material.listItemSelected = BaseTheme.primary;
        material.radioSelectedColorAndroid = BaseTheme.primary;
        material.segmentBackgroundColor = BaseTheme.primary;
        material.segmentActiveTextColor = BaseTheme.primary;
        material.segmentBorderColorMain = BaseTheme.primary;
        material.tabDefaultBg = BaseTheme.primary;

        // let cureThemeName = BaseTheme.themeName;
        // if(cureThemeName == themeName.blue){
        //     return;
        // }
        
        // if(cureThemeName == themeName.cyan){
        //     return;
        // }

        // if(cureThemeName == themeName.geekblue){
        //     return;
        // }

        // if(cureThemeName == themeName.gold){
        //     return;
        // }

        // if(cureThemeName == themeName.green){
        //     return;
        // }

        // if(cureThemeName == themeName.grey){
        //     return;
        // }

        // if(cureThemeName == themeName.lime){
        //     return;
        // }

        // if(cureThemeName == themeName.magenta){
        //     return;
        // }

        // if(cureThemeName == themeName.orange){
        //     return;
        // }

        // if(cureThemeName == themeName.purple){
        //     return;
        // }

        // if(cureThemeName == themeName.red){
        //     return;
        // }

        // if(cureThemeName == themeName.volcano){
        //     return;
        // }

        // if(cureThemeName == themeName.yellow){
        //     return;
        // }
    }

    getTheme(){
        return getTheme(material)
    }
}

export default new Theme()