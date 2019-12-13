import { connect } from 'react-redux'

// IERedux 是对 state 的封装，使 state 具有层级结构，如：
// ParentIERedux 的 StateType 是 "Parent"，其 reducer 返回的 state 是{ ParentState:"" }
// ChildIERedux 的 StateType 是 "Child"，其 reducer 返回的 state 是{ ChildState:"" }
// 那么，通过 ParentIERedux 加工后的 reducer 返回的 state 结构是 { ParentState:"", Child:{ ChildState:"" } }
export default abstract class BaseIERedux
{
    reducer:(state:any, action:any)=>any;
    ieRedux:Array<BaseIERedux>;
    parentIERedux:BaseIERedux | null;

    constructor(){
        this.reducer = (state, action)=>{ return state }
        this.ieRedux = [];
        this.parentIERedux = null;
    }

    abstract getStateType():string;

    // 在state中获取当前state
    private getCurrentState(state:any): any
    {
        if(this.parentIERedux == null){
            return state;
        }

        let parentState = this.parentIERedux.getCurrentState(state);
        return parentState[this.getStateType()];
    }

    setReducer(reducer:(state:any, action:any)=>any){
        this.reducer = reducer;
    }

    // 使用 BaseIERedux 应使用 BaseIERedux.connect 而不是 react-redux 的 connect 方法
    connect(
        mapStateToProps:any,
        mapDispatchToProps:any,
        mergeProps:any,
        options:any)
    {
        let stateType = this.getStateType();

        let ieMapStateToProps = (state:any, ownProps:any) => mapStateToProps(this.getCurrentState(state), ownProps);
        let ieMapDispatchToProps = (dispatch:(action:any)=>any, ownProps:any) => 
        {
            // 封装 dispatch
            let iedispatch = (action:any)=>{
                if (typeof action === "function") {		
                    return dispatch(action);
                }
                return dispatch({...action, ...{stateType: stateType}});
            }
            return mapDispatchToProps(iedispatch, ownProps)
        }
        
        return connect(ieMapStateToProps, ieMapDispatchToProps, mergeProps, options)
    }

    register(baseIERedux:BaseIERedux){
        this.ieRedux.push(baseIERedux);
        baseIERedux.parentIERedux = this;
    }

    // 获取封装了子 reducer 的 reducer
    getReducer()
    {
        let childReducers = this.ieRedux.map(item=>({ stateType:item.getStateType(), reducer: item.getReducer() }));

        return (state:any, action:any)=>
        {
            let newstate = this.reducer(state, action);

            childReducers.forEach(item => {
                newstate = {...newstate, ...{[item.stateType]:item.reducer(newstate[item.stateType], action)}}
            });

            return newstate
        }
    }
}