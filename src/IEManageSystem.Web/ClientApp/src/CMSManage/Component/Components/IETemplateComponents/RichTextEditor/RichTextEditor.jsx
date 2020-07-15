import React from 'react'
import PropTypes from 'prop-types'
import {BaseContentLeafComponent} from '../../BaseComponents/BaseContentLeafComponent'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'


import './RichTextEditor.css'

class RichTextEditor extends BaseContentLeafComponent {
    constructor(props) {
        super(props);
    }

    getComponentData() {
        return this.props.componentData || {};
    }

    render() {
        let text = this.props.componentData.getDefauleData().field1 || '<div class="ant-skeleton"><div class="ant-skeleton-content"><h3 class="ant-skeleton-title" style="width: 38%;"></h3><ul class="ant-skeleton-paragraph"><li></li><li></li><li style="width: 61%;"></li></ul></div></div>';

        return (<div dangerouslySetInnerHTML={{ __html: text }}></div>);
    }
}

RichTextEditor.defaultProps = {

};

export default RichTextEditor;