import IELink from './IELink'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    IELink(register);
    Preview(register);
    SettingConfig(register);
}