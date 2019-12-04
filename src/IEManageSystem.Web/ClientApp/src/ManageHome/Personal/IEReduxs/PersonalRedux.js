import BaseIERedux from 'Core/IEReduxs/BaseIERedux'

class Redux extends BaseIERedux
{
    getStateType(){
        return "personal";
    }
}

const redux = new Redux();

export default redux;