import IEBottomNav from './IEBottomNav'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    IEBottomNav(register);
    Preview(register);
    SettingConfig(register);
}