using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using Abp.Runtime.Session;
using Abp.UI;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Repositorys;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    [ApiAuthorization(ApiScopeProvider.Page)]
    public class PageManageAppService : IEManageSystemAppServiceBase, IPageManageAppService
    {
        private readonly IObjectMapper _objectMapper;

        private PageManager _pageManager { get; }

        private UserManager _userManager { get; }

        private IAbpSession _abpSession { get; }

        private UpdatePageComponentService _updatePageComponentService { get; set; }

        private DeletePageService _deletePageService { get; set; }

        public PageManageAppService(
            PageManager pageManager,
            IObjectMapper objectMapper,
            UserManager userManager,
            IAbpSession abpSession,
            UpdatePageComponentService updatePageComponentService,
            DeletePageService deletePageService
            )
        {
            _pageManager = pageManager;

            _objectMapper = objectMapper;

            _userManager = userManager;

            _abpSession = abpSession;

            _updatePageComponentService = updatePageComponentService;

            _deletePageService = deletePageService;
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
            page.Field1Name = input.Field1Name;
            page.Field2Name = input.Field2Name;
            page.Field3Name = input.Field3Name;
            page.Field4Name = input.Field4Name;
            page.Field5Name = input.Field5Name;

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _pageManager.AddPage(page, editor);

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
            page.Field1Name = input.Field1Name;
            page.Field2Name = input.Field2Name;
            page.Field3Name = input.Field3Name;
            page.Field4Name = input.Field4Name;
            page.Field5Name = input.Field5Name;

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _pageManager.UpdatePage(page, editor);

            return new UpdatePageOutput();
        }

        public UpdateContentPagePermissionOutput UpdateContentPagePermission(UpdateContentPagePermissionInput input) 
        {
            var page = _pageManager.PageRepository.FirstOrDefault(item => item.Name == input.Name);

            if (page == null)
            {
                throw new UserFriendlyException("未找到页面");
            }

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

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _pageManager.UpdateContentPagePermission(page, contentPagePeimissionCollection, editor);

            return new UpdateContentPagePermissionOutput();
        }

        public DeletePageOutput DeletePage(DeletePageInput input)
        {
            var page = _pageManager.PageRepository.FirstOrDefault(e=>e.Name == input.Name);

            if (page == null)
            {
                throw new UserFriendlyException("未找到页面");
            }

            _deletePageService.DeletePage(page);

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

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _updatePageComponentService.UpdatePageComponents(page, pageComponents, defaultComponentDatas, editor);

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
