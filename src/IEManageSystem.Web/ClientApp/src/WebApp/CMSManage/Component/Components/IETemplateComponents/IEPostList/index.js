import IEPostList from './IEPostList'
import Preview from './Preview'
import SettingConfig from './SettingConfig'

export default (register) => {
    IEPostList(register);
    Preview(register);
    SettingConfig(register);
}