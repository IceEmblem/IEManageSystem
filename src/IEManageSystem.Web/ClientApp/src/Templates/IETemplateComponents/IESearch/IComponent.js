import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from './Setting'

const searchRegex = /search=[^\&]*?/

export default class Component extends IComponent {
    state = {
        search: undefined
    }
    
    constructor(props){
        super(props)

        this.onClick = this.onClick.bind(this);
    }

    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }

    onClick() {
        let setting = this.getCurrentSetting();
        let params = this.props.location.search;

        if(!searchRegex.test(params)){
            if(!params) {
                params = `?search=${this.state.search || ''}`
            }
            else {
                params = `${params}&search=${this.state.search || ''}`
            }
        }
        else{
            params = params.replace(searchRegex, `search=${this.state.search || ''}`)
        }

        this.props.history.push(
            setting.url + params
        );
    }
}