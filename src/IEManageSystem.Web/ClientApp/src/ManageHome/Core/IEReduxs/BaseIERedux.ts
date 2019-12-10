import { connect } from 'react-redux'

export default abstract class BaseIERedux
{
    reducer:(state:any, action:any)=>any;
    ieRedux:Array<BaseIERedux>;

    constructor(){
        this.reducer = (state, action)=>{ return state }
        this.ieRedux = [];
    }

    abstract getStateType():string;

    setReducer(reducer:(state:any, action:any)=>any){
        this.reducer = reducer;
    }

    connect(
        mapStateToProps:any,
        mapDispatchToProps:any,
        mergeProps:any,
        options:any)
    {
        let stateType = this.getStateType();

        let ieMapStateToProps = (state:any, ownProps:any) => mapStateToProps(state[stateType], ownProps);
        let ieMapDispatchToProps = (dispatch:(action:any)=>any, ownProps:any) => 
        {
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
    }

    callReducer(state:any, action:any)
    {
        let stateType = this.getStateType();

        return {...state, ...{
            [stateType]: this.reducer(state[stateType], action)
        }}
    }

    getReducer()
    {
        let stateType = this.getStateType();

        return (state:any = {}, action:any)=>
        {
            let newstate = {};

            this.ieRedux.forEach(item => {
                newstate = {...newstate, ...item.callReducer(state, action)}
            })

            return {
                [stateType]:newstate
            }
        }
    }
}