import {BaseIERedux} from 'ice-common'

class Redux extends BaseIERedux
{
    getStateType(){
        return "personal";
    }
}

const redux = new Redux();

export default redux;