import IEImg from './IEImg'
import Preview from './Preview'
import DataConfig from './DataConfig'
import SettingConfig from './SettingConfig'

export default (register) => {
    IEImg(register);
    Preview(register);
    DataConfig(register);
    SettingConfig(register);
}