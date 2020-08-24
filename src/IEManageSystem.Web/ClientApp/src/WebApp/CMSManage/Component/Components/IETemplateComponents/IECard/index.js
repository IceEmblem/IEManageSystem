import IECard from './IECard'
import Preview from './Preview'
import DataConfig from './DataConfig'
import SettingConfig from './SettingConfig'

export default (register) => {
    IECard(register);
    Preview(register);
    DataConfig(register);
    SettingConfig(register);
}