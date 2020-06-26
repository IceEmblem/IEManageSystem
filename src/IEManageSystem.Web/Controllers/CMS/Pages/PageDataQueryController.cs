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

namespace IEManageSystem.Web.Controllers.CMS.Pages
{
    [Route("api/[controller]/[action]")]
    public class PageDataQueryController : IEManageSystemControllerBase
    {
        private PageManager _pageManager { get; }

        private PermissionManager _permissionManager { get; }

        private ClaimManager _claimManager { get; }

        private IPageDataQueryAppService _pageDataQueryAppService { get; }

        public PageDataQueryController(
            PageManager pageManager,
            ClaimManager claimManager,
            PermissionManager permissionManager,
            IPageDataQueryAppService pageDataQueryAppService) 
        {
            _pageManager = pageManager;
            _claimManager = claimManager;
            _permissionManager = permissionManager;
            _pageDataQueryAppService = pageDataQueryAppService;
        }

        private IEnumerable<Permission> GetUserPermissions()
        {
            IEnumerable<string> permissionNames = _claimManager.GetPermissionsForClaims(User.Claims);
            return _permissionManager.GetPermissionsForCache().Where(e => permissionNames.Contains(e.Name));
        }

        public ActionResult<GetPageDatasOutput> GetPageDatas(GetPageDatasInput input)
        {
            var permissions = GetUserPermissions();
            if (!_pageManager.IsCanQueryPost(input.PageName, permissions))
            {
                throw new Abp.Authorization.AbpAuthorizationException("未授权操作");
            }

            return _pageDataQueryAppService.GetPageDatas(input);
        }

        public ActionResult<GetPageDataOutput> GetPageData(GetPageDataInput input)
        {
            var permissions = GetUserPermissions();
            if (!_pageManager.IsCanQueryPost(input.PageName, permissions))
            {
                throw new Abp.Authorization.AbpAuthorizationException("未授权操作");
            }

            return _pageDataQueryAppService.GetPageData(input);
        }
    }
}
