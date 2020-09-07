import IESearch from './IESearch'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    IESearch(register);
    Preview(register);
    SettingConfig(register);
}