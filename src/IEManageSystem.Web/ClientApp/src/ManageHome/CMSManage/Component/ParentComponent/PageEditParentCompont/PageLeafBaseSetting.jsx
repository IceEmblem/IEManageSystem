import React from 'react';
import PropTypes from 'prop-types';
import BaseSetting from './BaseSetting'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import { pagesFetch } from 'CMSManage/IEReduxs/Actions'

class PageLeafBaseSetting extends BaseSetting {
    constructor(props) {
        super(props)

        if (this.props.pagesDidInvalidate) {
            this.props.pagesFetch();
        }
    }

    customizeFields() {
        let pageList = this.props.pages.map(item => <option value={item.id}>{item.displayName}</option>);

        // 如果当前没有选择页面且有页面，则默认选择第一个页面
        if (!this.props.pageComponentSetting.targetPageId &&
            this.props.pages.length > 0) {
            this.props.setPageComponentSetting({
                ...this.props.pageComponentSetting,
                ...{ targetPageId: this.props.pages[0].id }
            })
        }

        return (
            <div className="col-md-6 float-left">
                <label for="sel1">指定页面:</label>
                <div className="input-group mb-3">
                    <select className="form-control"
                        onChange={(event) => {
                            this.props.setPageComponentSetting({
                                ...this.props.pageComponentSetting,
                                ...{ targetPageId: event.currentTarget.value }
                            })
                        }}
                        value={this.props.pageComponentSetting.targetPageId}
                    >
                        {pageList}
                    </select>
                    <div className="input-group-append">
                        <span className="input-group-text">指定页面</span>
                    </div>
                </div>
            </div>
        );
    }
}

PageLeafBaseSetting.propTypes = {
    pages: PropTypes.array.isRequired,
    pagesDidInvalidate: PropTypes.bool.isRequired,
    pagesFetch: PropTypes.func.isRequired,
    pageComponentSetting: PropTypes.object.isRequired,
    setPageComponentSetting: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pages: state.page.pages,
        pagesDidInvalidate: state.page.pagesDidInvalidate
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pagesFetch: (searchKey) => { dispatch(pagesFetch(1, 9999, searchKey)) }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageLeafBaseSetting)

export default Contain