import { BaseComponent, BaseComponentProps } from '../BaseComponent'

export class BaseMenuComponentProps extends BaseComponentProps {
    constructor(){
        super();
    }
}

export default class BaseMenuComponent extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.getMenus(this.props.pageComponent.menuName);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.pageComponent.menuName != this.props.pageComponent.menuName){
            this.getMenus(nextProps.pageComponent.menuName);
        }
    }

    getMenus(menuName) {
        if(!menuName){
            return;
        }

        if(!this.props.isDefaultMenu){
            return;
        }

        this.props.dispatchMenuFetch(menuName);
    }
}