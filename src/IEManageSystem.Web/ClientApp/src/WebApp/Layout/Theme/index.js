import BaseTheme, {themeName} from 'BaseLayout/Theme'

class Theme {
    init(){
        let cureThemeName = BaseTheme.themeName;

        if(cureThemeName == themeName.blue){
            import("./blue.less").then(()=>{});
            return;
        }
        
        if(cureThemeName == themeName.cyan){
            import("./cyan.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.geekblue){
            import("./geekblue.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.gold){
            import("./gold.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.green){
            import("./green.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.grey){
            import("./grey.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.lime){
            import("./lime.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.magenta){
            import("./magenta.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.orange){
            import("./orange.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.purple){
            import("./purple.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.red){
            import("./red.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.volcano){
            import("./volcano.less").then(()=>{});
            return;
        }

        if(cureThemeName == themeName.yellow){
            import("./yellow.less").then(()=>{});
            return;
        }
    }
}

export default new Theme()