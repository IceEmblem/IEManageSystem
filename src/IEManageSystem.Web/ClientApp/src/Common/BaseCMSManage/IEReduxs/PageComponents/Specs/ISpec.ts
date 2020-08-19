import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'
import SpecResult from './SpecResult'

export default interface ISpec {
    check(pageComponent: PageComponentModel):SpecResult;
}