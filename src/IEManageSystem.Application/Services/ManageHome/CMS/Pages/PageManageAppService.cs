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

        public PageManageAppService(
            PageManager pageManager,
            IObjectMapper objectMapper
            )
        {
            _pageManager = pageManager;

            _objectMapper = objectMapper;
        }

        public AddPageOutput AddPage(AddPageInput input)
        {
            PageBase page = null;
            if (input.IsContentPage())
            {
                page = new ContentPage(input.Name);
            }
            else
            {
                page = new StaticPage(input.Name);
            }

            page.DisplayName = input.DisplayName;

            page.Description = input.Description;

            _pageManager.AddPage(page);

            return new AddPageOutput();
        }

        public UpdatePageOutput UpdatePage(UpdatePageInput input)
        {
            var page = _pageManager.PageRepository.FirstOrDefault(item => item.Name == input.Name);

            if (page == null)
            {
                throw new UserFriendlyException("未找到页面");
            }

            page.DisplayName = input.DisplayName;
            page.Description = input.Description;

            _pageManager.UpdatePage(page);

            return new UpdatePageOutput();
        }

        public UpdateContentPagePermissionOutput UpdateContentPagePermission(UpdateContentPagePermissionInput input) 
        {
            ContentPagePermissionCollection contentPagePeimissionCollection = new ContentPagePermissionCollection();
            contentPagePeimissionCollection.ManagePermissions = new List<ContentPagePermission>();
            foreach (var item in input.ContentPagePeimissionCollection.ManagePermissions) {
                contentPagePeimissionCollection.ManagePermissions.Add(new ContentPagePermission() { 
                    PermissionId = item.PermissionId
                });
            }
            contentPagePeimissionCollection.IsEnableQueryPermission = input.ContentPagePeimissionCollection.IsEnableQueryPermission;
            contentPagePeimissionCollection.QueryPermissions = new List<ContentPagePermission>();
            foreach (var item in input.ContentPagePeimissionCollection.QueryPermissions)
            {
                contentPagePeimissionCollection.QueryPermissions.Add(new ContentPagePermission()
                {
                    PermissionId = item.PermissionId
                });
            }

            _pageManager.UpdateContentPagePermission(input.Name, contentPagePeimissionCollection);

            return new UpdateContentPagePermissionOutput();
        }

        public DeletePageOutput DeletePage(DeletePageInput input)
        {
            _pageManager.DeletePage(input.Name);

            return new DeletePageOutput();
        }

        public UpdatePageComponentOutput UpdatePageComponent(UpdatePageComponentInput input)
        {
            List<PageComponentBase> pageComponents = new List<PageComponentBase>();
            foreach (var item in input.PageComponents) {
                pageComponents.Add(CreatePageComponent(item));
            }

            List<DefaultComponentData> defaultComponentDatas = new List<DefaultComponentData>();
            input.DefaultComponentDatas.ForEach(item =>
            {
                var defaultComponentData = new DefaultComponentData()
                {
                    Sign = item.Sign,
                    SingleDatas = _objectMapper.Map<List<SingleComponentData>>(item.SingleDatas)
                };
                ((List<SingleComponentData>)defaultComponentData.SingleDatas).ForEach(item => item.Id = 0);
                defaultComponentDatas.Add(defaultComponentData);
            });

            _pageManager.UpdatePageComponentsAndDefaultComponentData(input.Name, pageComponents, defaultComponentDatas);

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
                pageComponent = new PageLeafComponent(dto.Name) {
                    PageLeafSetting = _objectMapper.Map<PageLeafSetting>(dto.PageLeafSetting)
                };
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
                dto.PageComponentBaseSetting.BackgroundImage,
                dto.PageComponentBaseSetting.BackgroundColor,
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
                ((List<SingleSettingData>)pageComponentSetting.SingleDatas).ForEach(item => item.Id = 0);
                pageComponentSettings.Add(pageComponentSetting);
            }
            pageComponent.PageComponentSettings = pageComponentSettings;

            return pageComponent;
        }
    }
}
