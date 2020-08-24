import IELine from './IELine'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'

export default (register) => {
    IELine(register);
    Preview(register);
    SettingConfig(register);
    DataConfig(register);
}