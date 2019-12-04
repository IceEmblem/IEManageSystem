import BaseIERedux from './BaseIERedux'
import {reducer} from './Reducer'

class Redux extends BaseIERedux
{
    getReducer()
    {
        return (state, action)=>
        {
            let newstate = reducer(state, action);

            this.ieRedux.forEach(item => {
                newstate = item.callReducer(newstate, action)
            })

            return newstate
        }
    }
}

const RootRedux = new Redux();

export default RootRedux