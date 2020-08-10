import IEImg from './IEImg'
import Preview from './Preview'
import DataConfig from './DataConfig'

export default (register) => {
    IEImg(register);
    Preview(register);
    DataConfig(register);
}