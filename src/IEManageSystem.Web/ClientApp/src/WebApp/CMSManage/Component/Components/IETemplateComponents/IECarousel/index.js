import IECarousel from './IECarousel'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'

export default (register) => {
    IECarousel(register);
    Preview(register);
    SettingConfig(register);
    DataConfig(register);
}