import IEButton from './IEButton'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    IEButton(register);
    Preview(register);
    SettingConfig(register);
}