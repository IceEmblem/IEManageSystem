import React from 'react'
import PropTypes from 'prop-types'
import {BaseContentLeafComponent} from '../BaseContentLeafComponent'

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
        let text = this.getComponentData().field1 || '<p style="text-align:center;"><span style="font-size:20px"><strong><span style="color:#666666"><span style="line-height:2">感谢你使用冰纹系统</span></span></strong></span></p><p style="text-align:center;"><span style="font-size:20px"><span style="color:#666666"><span style="font-size:14px"><span style="line-height:2"><span style="letter-spacing:1px">冰纹系统使用React技术+Abp技术+.net core技术+领域驱动设计+.....，总之就是很高深的技术，看不懂没关系的</span></span></span></span></span></p><p style="text-align:center;"><span style="font-size:20px"><span style="color:#666666"><span style="font-size:14px"><span style="line-height:2"><span style="letter-spacing:1px">github地址：https://github.com/1373611035/IEManageSystem，不要问我为什么是1373611035，github上有个演示地址，但是很慢，因为没有钱买服务器</span></span></span></span></span></p><p style="text-align:center;"><span style="font-size:20px"><span style="color:#666666"><span style="font-size:14px"><span style="line-height:2"><span style="letter-spacing:1px">一直在写代码，直到膝盖中了一箭</span></span></span></span></span></p>';

        return (<div dangerouslySetInnerHTML={{ __html: text }}></div>);
    }
}

RichTextEditor.defaultProps = {

};

export default RichTextEditor;