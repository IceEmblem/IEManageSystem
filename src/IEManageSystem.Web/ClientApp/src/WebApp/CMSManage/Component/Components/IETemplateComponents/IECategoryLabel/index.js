import IECategoryLabel from './IECategoryLabel'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    IECategoryLabel(register);
    Preview(register);
    SettingConfig(register);
}