import RichTextEditor from './RichTextEditor'
import Preview from './Preview'
import DataConfig from './DataConfig'

export default (register) => {
    RichTextEditor(register);
    Preview(register);
    DataConfig(register);
}