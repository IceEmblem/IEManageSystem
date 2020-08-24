import IEPostTitle from './IEPostTitle'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    IEPostTitle(register);
    Preview(register);
    SettingConfig(register);
}