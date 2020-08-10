import IECard from './IECard'
import Preview from './Preview'
import DataConfig from './DataConfig'

export default (register) => {
    IECard(register);
    Preview(register);
    DataConfig(register);
}