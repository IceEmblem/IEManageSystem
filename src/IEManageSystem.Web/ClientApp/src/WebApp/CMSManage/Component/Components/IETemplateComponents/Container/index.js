import Container from './Container'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    Container(register);
    Preview(register);
    SettingConfig(register);
}