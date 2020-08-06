import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import ComponentDescribe, { componentType } from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject {
    Component = IocContainer.getService(IComponent)
    Preview = IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => {
    let componentDescribe = new ComponentDescribe("IEComment", new ComponentObject(), componentType.page);
    componentDescribe.logicCode = `
private static string _commentName { get; } = "commentData";

public override void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, PageBase page, User user, string request)
{
    if (user == null) {
        throw new AbpAuthorizationException("未登录，请先登录");
    }

    if (pageData == null) {
        throw new UserFriendlyException("组件只能在文章页面被调用");
    }

    var curComponentData = componentData;
    if (curComponentData == null) {
        curComponentData = CreateContentComponentData(pageComponent.Sign, pageData);
    }

    if (curComponentData.GetSingleDatas(_commentName).Count() > 1000) {
        throw new UserFriendlyException("评论已达到上限，无法再评论");
    }

    if (request.Length > 1000) {
        throw new UserFriendlyException("评论过长");
    }

    if (request.Length < 10)
    {
        throw new UserFriendlyException("评论过短，评论必须大于 10 个字符");
    }

    var commentData = curComponentData.CreateSingleData(_commentName);
    commentData.Field1 = user.Id.ToString();
    commentData.Field2 = user.Name;
    commentData.Field3 = user.HeadSculpture;
    commentData.Field4 = request;
    DateTime now = DateTime.Now;
    commentData.Field5 = $"{now.Year}-{now.Month}-{now.Day} {now.Hour}:{now.Minute}";
}
`;
    return componentDescribe;
}
export default componentDescribeBuilder;