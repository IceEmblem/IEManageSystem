import IEDrawer from './IEDrawer'
import Preview from './Preview'
import DataConfig from './DataConfig'

export default (register) => {
    IEDrawer(register);
    Preview(register);
    DataConfig(register);
}