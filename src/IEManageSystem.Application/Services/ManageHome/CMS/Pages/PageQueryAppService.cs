using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using Abp.UI;
using AutoMapper.QueryableExtensions;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Repositorys;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    public class PageQueryAppService: IEManageSystemAppServiceBase, IPageQueryAppService
    {
        private readonly IObjectMapper _objectMapper;

        private PageManager _pageManager { get; set; }

        private IRepository<ContentPagePermissionCollection> _contentPagePermissionCollectionRepository { get; }

        public PageQueryAppService(
            IObjectMapper objectMapper,
            PageManager pageManager,
            IRepository<ContentPagePermissionCollection> contentPagePermissionCollectionRepository
            )
        {
            _objectMapper = objectMapper;

            _pageManager = pageManager;

            _contentPagePermissionCollectionRepository = contentPagePermissionCollectionRepository;
        }

        public GetPagesOutput GetPages(GetPagesInput input)
        {
            IEnumerable<Page> pages = _pageManager.GetPagesForCache();

            // GetAll() 返回 IQueryable<TEntity>
            if (!string.IsNullOrEmpty(input.SearchKey)) {
                pages = pages.Where(e => e.DisplayName.Contains(input.SearchKey));
            }

            if (input.IsStaticPage()) {
                pages = pages.Where(e => e.Discriminator == Page.StaticPageDiscriminatorName);
            }
            else if (input.IsContentPage()){
                pages = pages.Where(e => e.Discriminator == Page.ContentPageDiscriminatorName);
            }

            int pageNum = pages.Count();

            var pageResults = pages.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            List<PageDto> pageDtos = new List<PageDto>();

            foreach (var page in pageResults) {
                pageDtos.Add(_objectMapper.Map<PageDto>(page));
            }

            return new GetPagesOutput()
            {
                ResourceNum = pageNum,
                PageIndex = input.PageIndex,
                Pages = pageDtos,
            };
        }

        public GetPagePermissionsOutput GetPagePermissions(GetPagePermissionsInput input) {
            var contentPagePermissions = _contentPagePermissionCollectionRepository.GetAllIncluding(e => e.ContentPagePermissions).FirstOrDefault(e => e.PageName == input.PageName);

            return new GetPagePermissionsOutput()
            {
                ContentPagePeimissionCollection = _objectMapper.Map<ContentPagePeimissionCollectionDto>(contentPagePermissions)
            };
        }
    }
}
