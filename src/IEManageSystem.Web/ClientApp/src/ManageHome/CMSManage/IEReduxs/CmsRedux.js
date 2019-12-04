import BaseIERedux from 'Core/IEReduxs/BaseIERedux'

class Redux extends BaseIERedux
{
    getStateType(){
        return "cms";
    }
}

const redux = new Redux();

export default redux;