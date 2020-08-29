import BaseComponentSettingConfig from './BaseComponentSettingConfig' 

export default class ComponentSettingConfig extends BaseComponentSettingConfig {
    constructor(
        name, 
        displayName, 
        ConfigComponent)
    {
        this.name = name;
        this.displayName = displayName;
        this.ConfigComponent = (props) => {
            let {data : pageComponent, setData, ...other} = props;

            return <ConfigComponent 
                {...other}
                data={pageComponent.getOrCreatePageComponentSetting(this.name)}
                setData={(data)=>{
                    pageComponent.replacePageComponentSetting(this.name, data)
                }}
            />
        }
    }
}