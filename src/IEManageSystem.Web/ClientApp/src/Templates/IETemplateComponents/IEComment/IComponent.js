import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'

export default class Component extends IComponent{
    state = {
        submitting: false,
        value: '',
    };
    
    handleSubmit = () => {
        this.setState({ submitting: true });
        this.props.execLogic(this.state.value)
            .then(value => {
                this.setState({ submitting: false, value: '' });
                this.props.pageFreshen();
            });
    };
}