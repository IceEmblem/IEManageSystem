using Abp.ObjectMapping;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Repositorys;
using IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.PageQuerys
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
            IEnumerable<PageBase> pages = string.IsNullOrEmpty(input.SearchKey) ?
                _repository.GetAll() :
                GetPagesForSearchKey(input.SearchKey);

            int pageNum = pages.Count();

            pages = pages.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize);

            List<PageDto> pageDtos = new List<PageDto>();

            foreach (var page in pages) {
                pageDtos.Add(CreatePageDtos(page));
            }

            return new GetPagesOutput()
            {
                ResourceNum = pageNum,
                PageIndex = input.PageIndex,
                Pages = pageDtos,
            };
        }

        private IEnumerable<PageBase> GetPagesForSearchKey(string searchKey)
        {
            return _repository.GetAll().Where(e =>
                e.DisplayName.Contains(searchKey) || e.Name.Contains(searchKey)
            );
        }

        /// <summary>
        /// 获取页面
        /// </summary>
        /// <param name="input"></param>
        /// <returns>如果不存在页面，需返回 null</returns>
        public GetPageOutput GetPage(GetPageInput input)
        {
            PageBase page = null;
            
            if (input.Id != null)
            {
                page = _repository
                    .ThenInclude(p => p.PageComponents,
                        pageComponent => pageComponent.PageComponentSettings,
                        pageComponentSetting => pageComponentSetting.SingleDatas)
                    .FirstOrDefault(e => e.Id == input.Id.Value);
            }

            if (page == null && !string.IsNullOrWhiteSpace(input.Name))
            {
                page = _repository
                        .ThenInclude(p => p.PageComponents,
                            pageComponent => pageComponent.PageComponentSettings,
                            pageComponentSetting => pageComponentSetting.SingleDatas)
                        .FirstOrDefault(item => item.Name == input.Name);
            }

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
                pageDto.PageType = "StaticPage";
            }
            else if (page is ContentPage)
            {
                pageDto.PageType = "ContentPage";
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

                dto.TargetPageId = pageLeafComponent.TargetPageId;
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

        /// <summary>
        /// 获取页面文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public GetPageDatasOutput GetPageDatas(GetPageDatasInput input)
        {
            PageBase page = null;
            if (!string.IsNullOrWhiteSpace(input.PageName))
            {
                page = _repository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == input.PageName);
            }

            if (page == null && input.Id != null)
            {
                page = _repository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Id == input.Id);
            }

            if (page == null)
            {
                throw new UserFriendlyException("获取文章列表失败，未找到页面");
            }

            return new GetPageDatasOutput()
            {
                PageDatas = _objectMapper.Map<List<PageDataDto>>(page.PageDatas),
                ResourceNum = page.PageDatas.Count,
                PageIndex = input.PageIndex
            };
        }

        /// <summary>
        /// 获取文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns>如果不存在文章，需返回 null</returns>
        public GetPageDataOutput GetPageData(GetPageDataInput input) 
        {
            var pageData = _pageDataManager.GetPageDataIncludeAllProperty(input.PageName, input.PageDataName);

            Expression<Func<ContentComponentData, object>>[] propertySelectors = {
                e=>e.SingleDatas
            };
            var componentDatas = _componentDataRepository.GetAllIncluding(propertySelectors).Where(e => e.PageDataId == pageData.Id).ToList();

            return new GetPageDataOutput()
            {
                PageData = _objectMapper.Map<PageDataDto>(pageData),
                ContentComponentDatas = _objectMapper.Map<List<ComponentDataDto>>(componentDatas)
            };
        }
    }
}
