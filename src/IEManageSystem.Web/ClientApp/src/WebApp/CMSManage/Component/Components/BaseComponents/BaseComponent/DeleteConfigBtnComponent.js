import React from 'react'
import PropTypes from 'prop-types'
import { IDeleteConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import IocContainer from 'Core/IocContainer';
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import {
    RemoveComponentAction,
} from 'BaseCMSManage/IEReduxs/Actions'


class DeleteConfigBtnComponent extends IDeleteConfigBtnComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <Tooltip
            title={`删除组件`}
        >
            <Button size='small' shape="round"
                type='primary'
                icon={<DeleteOutlined />}
                danger
                onClick={() => {
                    this.props.removeComponent();
                }}
            />
        </Tooltip>
    }
}

DeleteConfigBtnComponent.propTypes = {
    sign: PropTypes.string.isRequired,

    removeComponent: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    let pageId = ownProps.currentPageAndPost.pageId;
    let os = ownProps.currentPageAndPost.os;
    let pageComponent = state.pageComponents[pageId][os][ownProps.sign];

    return {
        pageComponent: pageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeComponent: () => {
            dispatch(new RemoveComponentAction(
                ownProps.currentPageAndPost.pageId,
                ownProps.currentPageAndPost.os,
                ownProps.sign
            ));
        }
    }
}

IocContainer.registerSingleIntances(IDeleteConfigBtnComponent, CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(DeleteConfigBtnComponent));
