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
    }

    getTheme(){
        return getTheme(material)
    }
}

export default new Theme()