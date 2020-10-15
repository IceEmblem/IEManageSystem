import {BaseIERedux} from 'ice-common'

class Redux extends BaseIERedux
{
    getStateType(): string {
        return "Setting";
    }
}

export default new Redux()