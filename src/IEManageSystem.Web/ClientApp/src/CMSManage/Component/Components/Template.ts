import TemplatePage from "./TemplatePage";


export default class Template {
    name: string;
    displayName: string;
    describe: string;
    company: string;
    templatePages: Array<TemplatePage> = [];
}