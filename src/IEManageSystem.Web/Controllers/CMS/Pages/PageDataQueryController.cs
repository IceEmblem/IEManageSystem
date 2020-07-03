using Abp.ObjectMapping;
using IEManageSystem.Web.Controllers;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.JwtAuthentication;
using IEManageSystem.Services.ManageHome.CMS.Pages;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Web.Controllers.CMS.Pages.Dto;
using IEManageSystem.Dtos.CMS;
using System.Linq.Dynamic.Core;
using Abp.Extensions;

namespace IEManageSystem.Web.Controllers.CMS.Pages
{
    [Route("api/[controller]/[action]")]
    public class PageDataQueryController : IEManageSystemControllerBase
    {
        private PageManager _pageManager { get; }

        private PermissionManager _permissionManager { get; }

        private ClaimManager _claimManager { get; }

        private IPageDataQueryAppService _pageDataQueryAppService { get; }

        private CheckPermissionService _checkPermissionService { get; }

        private IObjectMapper _objectMapper { get; }

        public PageDataQueryController(
            PageManager pageManager,
            ClaimManager claimManager,
            PermissionManager permissionManager,
            IPageDataQueryAppService pageDataQueryAppService,
            CheckPermissionService checkPermissionService,
            IObjectMapper objectMapper) 
        {
            _pageManager = pageManager;
            _claimManager = claimManager;
            _permissionManager = permissionManager;
            _pageDataQueryAppService = pageDataQueryAppService;
            _checkPermissionService = checkPermissionService;
            _objectMapper = objectMapper;
        }

        /// <summary>
        /// 是否拥有访问权限
        /// </summary>
        /// <param name="pageName"></param>
        /// <returns></returns>
        private bool IsCanAccess(string pageName)
        {
            IEnumerable<string> permissionNames = _claimManager.GetPermissionsForClaims(User.Claims);
            var permissions = _permissionManager.GetPermissionsForCache().Where(e => permissionNames.Contains(e.Name));

            return _pageManager.IsCanQueryPost(pageName, permissions) ||
                _checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, false, permissions);
        }

        /// <summary>
        /// 获取用户有文章访问权限的页面
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<GetPagesOfUserCanAccessPostOutput> GetPagesOfUserCanAccessPost([FromBody]GetPagesOfUserCanAccessPostInput input)
        {
            IEnumerable<string> permissionNames = _claimManager.GetPermissionsForClaims(User.Claims);
            var permissions = _permissionManager.GetPermissionsForCache().Where(e => permissionNames.Contains(e.Name));

            IEnumerable<ContentPage> pages = null;
            // 如果用户具有 Page域 的管理权限，则用户具有所有页面的管理权限
            if (_checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, false, permissions))
            {
                pages = _pageManager.PageRepository.GetAll().OfType<ContentPage>().ToList();
            }
            else
            {
                if (input.QueryOrManage)
                {
                    pages = _pageManager.GetPagesForManagePermission(permissions);
                }
                else 
                {
                    pages = _pageManager.GetPagesForQueryPermission(permissions);
                }
            }

            List<PageDto> pageDtos = new List<PageDto>();
            foreach (var page in pages) {
                var pageDto = new PageDto();

                pageDto.Id = page.Id;
                pageDto.Name = page.Name;
                pageDto.DisplayName = page.DisplayName;
                pageDto.Description = page.Description;

                pageDto.SetContentPage();
                pageDtos.Add(pageDto);
            }

            return new GetPagesOfUserCanAccessPostOutput()
            {
                Pages = pageDtos
            };
        }

        [HttpPost]
        public ActionResult<GetPageDatasOutput> GetPageDatas([FromBody] Dto.GetPageDatasInput input)
        {
            //if (!string.IsNullOrWhiteSpace(input.PageName) && !IsCanAccess(input.PageName))
            //{
            //    throw new Abp.Authorization.AbpAuthorizationException("未授权操作");
            //}

            IEnumerable<string> permissionNames = _claimManager.GetPermissionsForClaims(User.Claims);
            var permissions = _permissionManager.GetPermissionsForCache().Where(e => permissionNames.Contains(e.Name));

            Services.ManageHome.CMS.Pages.Dto.GetPageDatasInput appServiceInput = new Services.ManageHome.CMS.Pages.Dto.GetPageDatasInput();
            appServiceInput.PageIndex = input.PageIndex;
            appServiceInput.PageSize = input.PageSize;
            appServiceInput.SearchKey = input.SearchKey;
            appServiceInput.Top = input.Top;
            // 如果用户具有 Page域 的管理权限，则用户具有所有页面的管理权限
            if (_checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, false, permissions))
            {
                appServiceInput.EnablePageFilter = false;
            }
            else
            {
                appServiceInput.EnablePageFilter = true;

                if (!string.IsNullOrWhiteSpace(input.PageName))
                {
                    appServiceInput.PageIds = _pageManager.GetPagesForQueryPermission(permissions).Where(e => e.Name == input.PageName).Select(e => e.Id).ToList();
                }
                else 
                {
                    appServiceInput.PageIds = _pageManager.GetPagesForQueryPermission(permissions).Select(e => e.Id).ToList();
                }
            }

            return _pageDataQueryAppService.GetPageDatas(appServiceInput);
        }

        [HttpPost]
        public ActionResult<GetPageDataOutput> GetPageData([FromBody] GetPageDataInput input)
        {
            if (!IsCanAccess(input.PageName))
            {
                throw new Abp.Authorization.AbpAuthorizationException("未授权操作");
            }

            return _pageDataQueryAppService.GetPageData(input);
        }
    }
}
