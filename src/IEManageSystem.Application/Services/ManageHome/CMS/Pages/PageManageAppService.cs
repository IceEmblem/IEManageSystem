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

        private DeletePageService _deletePageService { get; set; }

        public PageManageAppService(
            PageManager pageManager,
            IObjectMapper objectMapper,
            UserManager userManager,
            IAbpSession abpSession,
            DeletePageService deletePageService
            )
        {
            _pageManager = pageManager;

            _objectMapper = objectMapper;

            _userManager = userManager;

            _abpSession = abpSession;

            _deletePageService = deletePageService;
        }

        public AddPageOutput AddPage(AddPageInput input)
        {
            Page page = _objectMapper.Map<Page>(input.Page);

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _pageManager.AddPage(page, editor, input.PageCompleteJson);

            return new AddPageOutput();
        }

        public UpdatePageOutput UpdatePage(UpdatePageInput input)
        {
            var page = _objectMapper.Map<Page>(input.Page);

            var editor = _userManager.GetUser((int)_abpSession.UserId.Value);

            _pageManager.UpdatePage(page, editor, input.PageCompleteJson);

            return new UpdatePageOutput();
        }

        public DeletePageOutput DeletePage(DeletePageInput input)
        {
            _deletePageService.DeletePage(input.Name);

            return new DeletePageOutput();
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
    }
}
