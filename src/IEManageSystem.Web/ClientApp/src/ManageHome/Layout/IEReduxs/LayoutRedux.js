import BaseIERedux from 'Core/IEReduxs/BaseIERedux'

class Redux extends BaseIERedux
{
    getStateType(){
        return "layout";
    }
}

const LayoutRedux = new Redux();

export default LayoutRedux;

