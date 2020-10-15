import {BaseIERedux} from 'ice-common'

class Redux extends BaseIERedux
{
    getStateType(){
        return "baseLayout";
    }
}

const LayoutRedux = new Redux();

export default LayoutRedux;

