import Text from './Text'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'

export default (register) => {
    Text(register);
    Preview(register);
    SettingConfig(register);
    DataConfig(register);
}