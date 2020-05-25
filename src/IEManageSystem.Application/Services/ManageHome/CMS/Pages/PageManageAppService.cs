using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using Abp.UI;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Repositorys;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    [ApiAuthorization(ApiScopeProvider.Page)]
    public class PageManageAppService : IEManageSystemAppServiceBase, IPageManageAppService
    {
        private readonly IObjectMapper _objectMapper;

        private PageManager _pageManager { get; set; }

        private IPageRepository _repository => _pageManager.PageRepository;

        private PageDataManager _pageDataManager { get; set; }

        public PageManageAppService(
            PageManager pageManager,
            PageDataManager pageDataManager,
            IObjectMapper objectMapper
            )
        {
            _pageManager = pageManager;

            _pageDataManager = pageDataManager;

            _objectMapper = objectMapper;
        }

        public AddContentPageOutput AddContentPage(AddContentPageInput input)
        {
            ContentPage page = new ContentPage(input.Name);

            page.DisplayName = input.DisplayName;

            page.Description = input.Description;

            _pageManager.AddPage(page);

            return new AddContentPageOutput();
        }

        public AddStaticPageOutput AddStaticPage(AddStaticPageInput input)
        {
            StaticPage page = _pageManager.CreateStaticPage(input.Name, input.DisplayName);

            page.Description = input.Description;

            _pageManager.AddPage(page);

            return new AddStaticPageOutput();
        }

        public DeletePageOutput DeletePage(DeletePageInput input)
        {
            _pageManager.DeletePage(input.Name);

            return new DeletePageOutput();
        }

        public UpdatePageOutput UpdatePage(UpdatePageInput input)
        {
            var page = _repository.FirstOrDefault(item=>item.Name == input.Name);

            if (page == null) {
                throw new UserFriendlyException("未找到页面");
            }

            page.DisplayName = input.DisplayName;
            page.Description = input.Description;

            return new UpdatePageOutput();
        }

        public UpdatePageComponentOutput UpdatePageComponent(UpdatePageComponentInput input)
        {
            List<PageComponentBase> pageComponents = new List<PageComponentBase>();
            foreach (var item in input.PageComponents) {
                pageComponents.Add(CreatePageComponent(item));
            }

            _pageManager.UpdatePageComponents(input.Name, pageComponents);

            return new UpdatePageComponentOutput();
        }

        private PageComponentBase CreatePageComponent(PageComponentDto dto)
        {
            PageComponentBase pageComponent = null;

            if (dto.IsCompositeComponentType())
            {
                pageComponent = new CompositeComponent(dto.Name);
            }
            else if (dto.IsPageLeafComponentType())
            {
                pageComponent = new PageLeafComponent(dto.Name);
                if (dto.TargetPageId.HasValue)
                {
                    var page = _repository.FirstOrDefault(dto.TargetPageId.Value);
                    ((PageLeafComponent)pageComponent).TargetPage = page;
                }
            }
            else if (dto.IsMenuComponentType()) 
            {
                pageComponent = new MenuComponent(dto.Name) { 
                    MenuName = dto.MenuName
                };
            }
            else
            {
                pageComponent = new LeafComponent(dto.Name);
            }

            pageComponent.Sign = dto.Sign;
            pageComponent.ParentSign = dto.ParentSign;
            pageComponent.PageComponentBaseSetting = new PageComponentBaseSetting(
                dto.PageComponentBaseSetting.SortIndex,
                dto.PageComponentBaseSetting.Width,
                dto.PageComponentBaseSetting.Height,
                dto.PageComponentBaseSetting.Padding,
                dto.PageComponentBaseSetting.Margin,
                dto.PageComponentBaseSetting.BackgroundColor,
                dto.PageComponentBaseSetting.BackgroundImage,
                dto.PageComponentBaseSetting.ClassName
                );

            var pageComponentSettings = new List<PageComponentSetting>();
            foreach (var item in dto.PageComponentSettings ?? new List<PageComponentSettingDto>()) {
                PageComponentSetting pageComponentSetting = new PageComponentSetting()
                {
                    Name = item.Name,
                    DisplayName = item.DisplayName,
                    SingleDatas = _objectMapper.Map<List<SingleSettingData>>(item.SingleDatas)
                };
                pageComponentSettings.Add(pageComponentSetting);
            }
            pageComponent.PageComponentSettings = pageComponentSettings;

            return pageComponent;
        }

        public AddPageDataOutput AddPageData(AddPageDataInput input)
        {
            PageData pageData = new PageData() {
                Name = input.Name,
                Title = input.Title
            };

            _pageDataManager.AddPageData(input.PageName, pageData);

            return new AddPageDataOutput();
        }

        public UpdatePageDataOutput UpdatePageData(UpdatePageDataInput input)
        {
            var page = _repository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == input.PageName);

            if (page is StaticPage)
            {
                throw new UserFriendlyException("无法更改单页文章");
            }

            var post = page.PageDatas.First(e=>e.Id == input.Id);
            post.Name = input.Name;
            post.Title = input.Title;
            _pageDataManager.UpdatePageData(post);

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

                foreach (var singleData in item.SingleDatas) {
                    componentData.SingleDatas.Add(new SingleComponentData() {
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
