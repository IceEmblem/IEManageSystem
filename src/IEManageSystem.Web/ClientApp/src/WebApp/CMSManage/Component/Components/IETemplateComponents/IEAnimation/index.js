import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    Component(register);
    Preview(register);
    SettingConfig(register);
}