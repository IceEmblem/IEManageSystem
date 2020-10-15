using Abp.Dependency;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel
{
    public class UpdateContentComponentDataService : ITransientDependency
    {
        public PageDataManager _pageDataManager { get; set; }

        public ComponentDataManager _componentDataManager { get; set; }

        public UpdateContentComponentDataService(
            PageDataManager pageDataManager,
            ComponentDataManager componentDataManager) 
        {
            _pageDataManager = pageDataManager;
            _componentDataManager = componentDataManager;
        }

        public void UpdateContentComponentData(PageData pageData, List<ContentComponentData> contentComponentDatas, User user) 
        {
            _pageDataManager.UpdatePageDataLastUpdater(pageData, user);
            _componentDataManager.UpdateContentComponentData(pageData, contentComponentDatas);
        }

        public void UpdateContentComponentDataOfCreator(PageData pageData, List<ContentComponentData> contentComponentDatas, User user)
        {
            if (pageData.Creator.EditorId != user.Id)
            {
                throw new UserFriendlyException("你不是文章的创建者，没有权限修改组件数据");
            }

            _pageDataManager.UpdatePageDataLastUpdater(pageData, user);
            _componentDataManager.UpdateContentComponentData(pageData, contentComponentDatas);
        }
    }
}
