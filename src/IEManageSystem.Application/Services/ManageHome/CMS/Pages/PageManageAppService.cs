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
using IEManageSystem.CMS.DomainModel.PageComponents;
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

        private PageManager _pageManager { get; }

        private PageComponentManager _pageComponentManager { get; }

        private ComponentDataManager _componentDataManager { get; }

        private PageDataManager _pageDataManager { get; }

        public PageManageAppService(
            PageManager pageManager,
            IObjectMapper objectMapper,
            PageComponentManager pageComponentManager,
            ComponentDataManager componentDataManager,
            PageDataManager pageDataManager
            )
        {
            _pageManager = pageManager;

            _objectMapper = objectMapper;

            _pageComponentManager = pageComponentManager;

            _componentDataManager = componentDataManager;

            _pageDataManager = pageDataManager;
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

            contentPagePeimissionCollection.IsEnableQueryPermission = input.ContentPagePeimissionCollection.IsEnableQueryPermission;
            contentPagePeimissionCollection.ContentPagePermissions = new List<ContentPagePermission>();
            foreach (var item in input.ContentPagePeimissionCollection.ContentPagePermissions)
            {
                contentPagePeimissionCollection.ContentPagePermissions.Add(new ContentPagePermission()
                {
                    PermissionId = item.PermissionId,
                    IsManage = item.IsManage
                });
            }

            _pageManager.UpdateContentPagePermission(input.Name, contentPagePeimissionCollection);

            return new UpdateContentPagePermissionOutput();
        }

        public DeletePageOutput DeletePage(DeletePageInput input)
        {
            var page = _pageManager.PageRepository.FirstOrDefault(e=>e.Name == input.Name);

            if (page == null)
            {
                throw new UserFriendlyException("未找到页面");
            }

            // 删除页面
            _pageManager.DeletePage(page);

            // 删除所有文章
            _pageDataManager.DeletePagePosts(page);

            // 删除组件
            _pageComponentManager.DeletePageComponents(page);

            // 删除默认数据
            _componentDataManager.DeleteDefaultComponentData(page);

            return new DeletePageOutput();
        }

        public UpdatePageComponentOutput UpdatePageComponent(UpdatePageComponentInput input)
        {
            List<PageComponent> pageComponents = new List<PageComponent>();
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

            var page = _pageManager.PageRepository.FirstOrDefault(e => e.Name == input.Name);

            _pageComponentManager.UpdatePageComponents(page, pageComponents);

            _componentDataManager.UpdateDefaultComponentData(page, defaultComponentDatas);

            return new UpdatePageComponentOutput();
        }

        private PageComponent CreatePageComponent(PageComponentDto dto)
        {
            PageComponent pageComponent = new PageComponent(dto.Name);

            pageComponent.MenuName = dto.MenuName;
            pageComponent.PageLeafSetting = _objectMapper.Map<PageLeafSetting>(dto.PageLeafSetting);
            pageComponent.ComponentOSType = ComponentOSType.CreateOSType(dto.OS);
            pageComponent.Sign = dto.Sign;
            pageComponent.ParentSign = dto.ParentSign;
            pageComponent.Group = dto.Group;
            pageComponent.PageComponentBaseSetting = _objectMapper.Map<PageComponentBaseSetting>(dto.PageComponentBaseSetting);

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
