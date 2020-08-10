import IEPageSetting from './IEPageSetting'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    IEPageSetting(register);
    Preview(register);
    SettingConfig(register);
}