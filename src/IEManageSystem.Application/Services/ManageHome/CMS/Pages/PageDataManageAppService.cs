using Abp.Application.Services;
using Abp.ObjectMapping;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    [RemoteService(false)]
    [ApiAuthorization(ApiScopeProvider.Page)]
    public class PageDataManageAppService : IEManageSystemAppServiceBase, IPageDataManageAppService
    {
        private PageDataManager _pageDataManager { get; set; }

        public PageDataManageAppService(
            PageDataManager pageDataManager
            )
        {
            _pageDataManager = pageDataManager;
        }


        public AddPageDataOutput AddPageData(AddPageDataInput input)
        {
            PageData pageData = new PageData()
            {
                Name = input.Name,
                Title = input.Title
            };

            _pageDataManager.AddPageData(input.PageName, pageData);

            return new AddPageDataOutput();
        }

        public UpdatePageDataOutput UpdatePageData(UpdatePageDataInput input)
        {
            var post = _pageDataManager.PostRepository.FirstOrDefault(input.Id);
            post.Name = input.Name;
            post.Title = input.Title;
            _pageDataManager.UpdatePageData(input.PageName, post);

            return new UpdatePageDataOutput();
        }

        public DeletePageDataOutput DeletePageData(DeletePageDataInput input)
        {
            _pageDataManager.DeletePageData(input.PageName, input.Name);

            return new DeletePageDataOutput();
        }

        public UpdateComponentDataOutput UpdateComponentData(UpdateComponentDataInput input)
        {
            List<ContentComponentData> contentComponentDatas = new List<ContentComponentData>();
            foreach (var item in input.ComponentDatas)
            {
                var componentData = new ContentComponentData()
                {
                    Sign = item.Sign,

                };
                componentData.SingleDatas = new List<SingleComponentData>();

                foreach (var singleData in item.SingleDatas)
                {
                    componentData.SingleDatas.Add(new SingleComponentData()
                    {
                        Name = singleData.Name,
                        SortIndex = singleData.SortIndex,
                        Field1 = singleData.Field1,
                        Field2 = singleData.Field2,
                        Field3 = singleData.Field3,
                        Field4 = singleData.Field4,
                        Field5 = singleData.Field5,
                    });
                }

                contentComponentDatas.Add(componentData);
            }

            _pageDataManager.SetContentComponentDatas(input.PageName, input.PageDataName, contentComponentDatas);

            return new UpdateComponentDataOutput();
        }
    }
}
