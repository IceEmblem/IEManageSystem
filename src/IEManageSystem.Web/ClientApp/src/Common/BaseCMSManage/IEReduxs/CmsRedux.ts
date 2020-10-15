import {BaseIERedux} from 'ice-common'

class Redux extends BaseIERedux
{
    getStateType(){
        return "cms";
    }
}

const redux = new Redux();

export default redux;