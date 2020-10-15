import {BaseIERedux} from 'ice-common'

class Redux extends BaseIERedux
{
    getStateType(): string {
        return "Root";
    }
    
    // connect(
    //     mapStateToProps:any,
    //     mapDispatchToProps:any,
    //     mergeProps:any,
    //     options:any): any
    // {
    //     throw new Error("不能在根Redux中调用");
    // }

    // getReducer()
    // {
    //     return (state:any, action:any)=>
    //     {
    //         let newstate = reducer(state, action);

    //         this.ieRedux.forEach(item => {
    //             newstate = item.callReducer(newstate, action)
    //         })

    //         return newstate
    //     }
    // }
}

const RootRedux = new Redux();

export default RootRedux