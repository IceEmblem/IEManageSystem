using Abp.ObjectMapping;
using IEManageSystem.Web.Controllers;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.CMS.DomainModel.PageDatas;
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
    public class PageDataManageController : IEManageSystemControllerBase
    {
        private IPageDataManageAppService _pageDataManageAppService { get; }

        private PageManager _pageManager { get; }

        private PermissionManager _permissionManager { get; }

        private ClaimManager _claimManager { get; }

        private CheckPermissionService _checkPermissionService { get; }

        public PageDataManageController(
            IPageDataManageAppService pageDataManageAppService,
            PageManager pageManager,
            PermissionManager permissionManager,
            ClaimManager claimManager,
            CheckPermissionService checkPermissionService
            )
        {
            _pageDataManageAppService = pageDataManageAppService;
            _pageManager = pageManager;
            _permissionManager = permissionManager;
            _claimManager = claimManager;
            _checkPermissionService = checkPermissionService;
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

            return _pageManager.IsCanManagePost(pageName, permissions) || 
                _checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, false, permissions);
        }

        public ActionResult<AddPageDataOutput> AddPageData(AddPageDataInput input)
        {
            if (!IsCanAccess(input.PageName))
            {
                throw new Abp.Authorization.AbpAuthorizationException("未授权操作");
            }

            return _pageDataManageAppService.AddPageData(input);
        }

        public ActionResult<UpdatePageDataOutput> UpdatePageData(UpdatePageDataInput input)
        {
            if (!IsCanAccess(input.PageName))
            {
                throw new Abp.Authorization.AbpAuthorizationException("未授权操作");
            }

            return _pageDataManageAppService.UpdatePageData(input);
        }

        public ActionResult<DeletePageDataOutput> DeletePageData(DeletePageDataInput input)
        {
            if (!IsCanAccess(input.PageName))
            {
                throw new Abp.Authorization.AbpAuthorizationException("未授权操作");
            }

            return _pageDataManageAppService.DeletePageData(input);
        }

        public ActionResult<UpdateComponentDataOutput> UpdateComponentData(UpdateComponentDataInput input)
        {
            if (!IsCanAccess(input.PageName))
            {
                throw new Abp.Authorization.AbpAuthorizationException("未授权操作");
            }

            return _pageDataManageAppService.UpdateComponentData(input);
        }
    }
}
