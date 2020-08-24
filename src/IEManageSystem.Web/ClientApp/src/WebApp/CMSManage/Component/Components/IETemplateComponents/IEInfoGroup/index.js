import IEInfoGroup from './IEInfoGroup'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'

export default (register) => {
    IEInfoGroup(register);
    Preview(register);
    SettingConfig(register);
    DataConfig(register);
}