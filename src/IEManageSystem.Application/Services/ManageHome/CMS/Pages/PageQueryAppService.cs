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

        private PageDataManager _pageDataManager { get; set; }

        private IEfRepository<ContentComponentData, int> _componentDataRepository { get; set; }

        private IEfRepository<DefaultComponentData, int> _defaultDataRepository { get; set; }

        private IPageRepository _repository => _pageManager.PageRepository;

        public PageQueryAppService(
            IObjectMapper objectMapper,
            PageManager pageManager,
            PageDataManager pageDataManager,
            IEfRepository<ContentComponentData, int> componentDataRepository,
            IEfRepository<DefaultComponentData, int> defaultDataRepository
            )
        {
            _objectMapper = objectMapper;

            _pageManager = pageManager;

            _pageDataManager = pageDataManager;

            _componentDataRepository = componentDataRepository;

            _defaultDataRepository = defaultDataRepository;
        }

        public GetPagesOutput GetPages(GetPagesInput input)
        {
            // GetAll() 返回 IQueryable<TEntity>
            var pages = string.IsNullOrEmpty(input.SearchKey) ?
                _repository.GetAll() :
                GetPagesForSearchKey(input.SearchKey);

            if (input.IsStaticPage()) {
                pages = pages.OfType<StaticPage>();
            }
            else if (input.IsContentPage()){
                pages = pages.OfType<ContentPage>();
            }

            int pageNum = pages.Count();

            var pageResults = pages.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            List<PageDto> pageDtos = new List<PageDto>();

            foreach (var page in pageResults) {
                pageDtos.Add(CreatePageDtos(page));
            }

            return new GetPagesOutput()
            {
                ResourceNum = pageNum,
                PageIndex = input.PageIndex,
                Pages = pageDtos,
            };
        }

        private IQueryable<PageBase> GetPagesForSearchKey(string searchKey)
        {
            return _repository.GetAll().Where(e => e.DisplayName.Contains(searchKey));
        }

        /// <summary>
        /// 获取页面
        /// </summary>
        /// <param name="input"></param>
        /// <returns>如果不存在页面，需返回 null</returns>
        public GetPageOutput GetPage(GetPageInput input)
        {
            // 如果输入的是数值字符串，会试图转为 PageId
            int pageId;
            if (int.TryParse(input.Name, out pageId))
            {
                string pageName = _pageManager.GetPageNameCache(pageId);

                if (!string.IsNullOrWhiteSpace(pageName))
                {
                    input.Name = pageName;
                }
            }

            PageBase page = _pageManager.GetPageForCache(input.Name);

            if (page == null)
            {
                return new GetPageOutput() { Page = null, DefaultComponentDatas = new List<ComponentDataDto>() };
            }

            Expression<Func<DefaultComponentData, object>>[] propertySelectors = {
                e=>e.SingleDatas
            };
            var defaultComponentDatas = _defaultDataRepository.GetAllIncluding(propertySelectors).Where(e=>e.PageId == page.Id).ToList();

            return new GetPageOutput() { Page = CreatePageDtos(page), 
                DefaultComponentDatas = _objectMapper.Map<List<ComponentDataDto>>(defaultComponentDatas) };
        }

        private PageDto CreatePageDtos(PageBase page)
        {
            var pageDto = new PageDto();
            pageDto.Id = page.Id;
            pageDto.Name = page.Name;
            pageDto.DisplayName = page.DisplayName;
            pageDto.Description = page.Description;

            if (page is StaticPage)
            {
                pageDto.SetStaticPage();
            }
            else if (page is ContentPage)
            {
                pageDto.SetContentPage();

                var contentPage = (ContentPage)page;
                pageDto.ContentPagePeimissionCollection =
                    contentPage.ContentPagePermissionCollection != null ? 
                        _objectMapper.Map<ContentPagePeimissionCollectionDto>(contentPage.ContentPagePermissionCollection)
                        : null;
            }

            if (page.PageComponents == null) {
                return pageDto;
            }

            List<PageComponentDto> pageComponents = new List<PageComponentDto>();
            foreach (var pageComponent in page.PageComponents) 
            {
                pageComponents.Add(CreatePageComponentDto(pageComponent));
            }

            pageDto.PageComponents = pageComponents;

            return pageDto;
        }

        private PageComponentDto CreatePageComponentDto(PageComponentBase component)
        {
            PageComponentDto dto = new PageComponentDto();

            dto.Id = component.Id;
            dto.Name = component.Name;
            dto.Sign = component.Sign;
            dto.ParentSign = component.ParentSign;
            dto.PageComponentBaseSetting = _objectMapper.Map<PageComponentBaseSettingDto>(component.PageComponentBaseSetting);
            dto.PageComponentSettings = new List<PageComponentSettingDto>();

            foreach (var item in component.PageComponentSettings) {
                PageComponentSettingDto pageComponentSetting = new PageComponentSettingDto() {
                    Id = item.Id,
                    Name = item.Name,
                    DisplayName = item.DisplayName,
                    SingleDatas = _objectMapper.Map<List<SingleSettingDataDto>>(item.SingleDatas)
                };

                dto.PageComponentSettings.Add(pageComponentSetting);
            }

            if (component is CompositeComponent)
            {
                dto.SetCompositeComponentType();
            }
            else if (component is PageLeafComponent)
            {
                var pageLeafComponent = (PageLeafComponent)component;
                dto.PageLeafSetting = _objectMapper.Map<PageLeafSettingDto>(pageLeafComponent.PageLeafSetting);

                dto.SetPageLeafComponentType();
            }
            else if (component is MenuComponent) 
            {
                dto.MenuName = ((MenuComponent)component).MenuName;

                dto.SetMenuComponentType();
            }
            else
            {
                dto.SetLeafComponentType();
            }

            return dto;
        }
    }
}
