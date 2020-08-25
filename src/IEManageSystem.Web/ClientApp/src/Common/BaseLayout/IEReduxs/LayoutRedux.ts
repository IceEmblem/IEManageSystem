import BaseIERedux from 'Core/IEReduxs/BaseIERedux'

class Redux extends BaseIERedux
{
    getStateType(){
        return "baseLayout";
    }
}

const LayoutRedux = new Redux();

export default LayoutRedux;

