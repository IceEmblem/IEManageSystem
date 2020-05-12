import React from 'react'
import ComponentFactory from 'CMSManage/Component/Components/ComponentFactory';
import Resource from 'Resource/Resource.jsx';
import { ResourceDescribeValueType } from 'ResourceForm/ResourceDescribeValueType'
import { ieReduxFetch } from 'Core/IEReduxFetch';

export default class LogicManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 以注册的逻辑
            logics: []
        }

        this.freshenResources = this.freshenResources.bind(this);

        // 存在逻辑代码的组件
        this.existLogicCodeComponentDescribes = ((Array)(new ComponentFactory().getComponentDescribes()))
            .filter(e =>
                e.logicCode &&
                e.logicCode.trim() != "");

        // 注册按钮组件
        this.registerBtn = (props) => (
            <button className="btn btn-outline-secondary"
                onClick={() => {
                    let postData = {
                        name: props.resource.name,
                        code: props.resource.code
                    };

                    ieReduxFetch("/api/Logic/RegisterLogic", postData)
                        .then(value => {
                            this.freshenResources();
                        });
                }}
            >
                <span className="oi oi-pencil" title="icon name" aria-hidden="true"></span>{" 注册逻辑代码"}
            </button>);
    }

    getDescribes() {
        return [
            { name: "name", text: "代码名称", isId: true, isName: true, isShowOnList: true },
            { name: "code", text: "代码", isShowOnList: false },
            {
                name: "isRegister", text: "是否已注册", isShowOnList: true,
                valueType: ResourceDescribeValueType.radio,
                valueTexts: [{ value: true, text: "已注册" }, { value: false, text: "未注册" }],
                isEditCanEdit: false
            }
        ];
    }

    freshenResources(pageIndex, pageSize, searchKey) {
        let postData = {
        };

        ieReduxFetch("/api/Logic/GetLogics", postData)
            .then(value => {
                let logics = [];
                for (let item in this.existLogicCodeComponentDescribes) {
                    logics.push({
                        name: this.existLogicCodeComponentDescribes[item].name,
                        code: this.existLogicCodeComponentDescribes[item].logicCode,
                        isRegister: ((Array)(value.logics)).some(e => e.name == this.existLogicCodeComponentDescribes[item].name)
                    });
                }

                this.setState({ logics: logics });
            });
    }

    render() {
        return (<div className="col-md-12">
            <Resource
                title="逻辑代码管理"
                describes={this.getDescribes()}
                resources={this.state.logics}	// ++
                freshenResources={this.freshenResources}
                customizeOperateBtns={[this.registerBtn]}
                hideAdd={true}
                hideEdit={true}
                hideDelete={true}
                hidePadding={true}
            />
        </div>);
    }
}