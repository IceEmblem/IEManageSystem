import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import * as BaseComponentContainer from '../BaseComponent/ComponentContainer'

var queryRegex = /^\?/;

const getQueryVariable = (variable, search) => {
    let query = search.replace(queryRegex, "");
    
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return "";
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let curtag = getQueryVariable("tag", ownProps.location.search);

    return {
        ...{curtag},
        ...BaseComponentContainer.mapStateToProps(state, ownProps),
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    BaseComponentContainer.mapDispatchToProps,
    BaseComponentContainer.mergeProps
)

export default Contain;