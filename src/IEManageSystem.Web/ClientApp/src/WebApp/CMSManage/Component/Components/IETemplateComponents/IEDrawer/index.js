import IEDrawer from './IEDrawer'
import Preview from './Preview'
import DataConfig from './DataConfig'
import SettingConfig from './SettingConfig'

export default (register) => {
    IEDrawer(register);
    Preview(register);
    DataConfig(register);
    SettingConfig(register);
}