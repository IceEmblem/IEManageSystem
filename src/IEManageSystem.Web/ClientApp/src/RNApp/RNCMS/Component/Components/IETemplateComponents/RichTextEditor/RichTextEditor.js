import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/RichTextEditor/IComponent'
import HTMLView from 'react-native-htmlview';

class RichTextEditor extends IComponent {
    constructor(props) {
        super(props);
    }

    getComponentData() {
        return this.props.componentData || {};
    }

    render() {
        let text = this.props.componentData.getDefauleData().field1 || 
        `
        <div style="display: table; width: 100%;">
            <div style="display: table-cell;width: 100%;vertical-align: top;">
                <h3 style="width: 38%;height: 16px;margin-top: 16px;background: #f2f2f2;"></h3>
                <ul style="margin-top: 24px;padding: 0px;">
                    <li style="width: 100%;height: 16px;list-style: none;background: #f2f2f2;margin-top: 16px;"></li>
                    <li style="width: 100%;height: 16px;list-style: none;background: #f2f2f2;margin-top: 16px;"></li>
                    <li style="width: 61%;height: 16px;list-style: none;background: #f2f2f2;margin-top: 16px;"></li>
                </ul>
            </div>
        </div>
        `;

        return (<HTMLView
            value={text}
        />);
    }
}

RichTextEditor.defaultProps = {

};

export default (register) => register(IComponent, RichTextEditor);
