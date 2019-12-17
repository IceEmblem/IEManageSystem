using Abp.ObjectMapping;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.PageQuerys
{
    public class PageQueryAppService: IEManageSystemAppServiceBase, IPageQueryAppService
    {
        private readonly IObjectMapper _objectMapper;

        private PageManager _pageManager { get; set; }

        private PageDataManager _pageDataManager { get; set; }

        private IPageRepository _repository => _pageManager.PageRepository;

        public PageQueryAppService(
            IObjectMapper objectMapper,
            PageManager pageManager,
            PageDataManager pageDataManager
            )
        {
            _objectMapper = objectMapper;

            _pageManager = pageManager;

            _pageDataManager = pageDataManager;
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

        public GetPageOutput GetPage(GetPageInput input)
        {
            PageBase page = null;
            
            if (input.Id != null)
            {
                page = _repository.ThenInclude(p => p.PageComponents, pageComponent => pageComponent.PageComponentSettings).FirstOrDefault(e => e.Id == input.Id.Value);
            }

            if (page == null && !string.IsNullOrWhiteSpace(input.Name))
            {
                page = _repository.ThenInclude(p => p.PageComponents, pageComponent => pageComponent.PageComponentSettings).FirstOrDefault(item => item.Name == input.Name);
            }

            if (page == null)
            {
                return new GetPageOutput() { Page = null };
            }



            return new GetPageOutput() { Page = CreatePageDtos(page) };
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

        private PageComponentDto CreatePageComponentDto(PageComponentBase page)
        {
            PageComponentDto dto = new PageComponentDto();

            dto.Name = page.Name;
            dto.Sign = page.Sign;
            dto.ParentSign = page.ParentSign;
            dto.PageComponentBaseSetting = _objectMapper.Map<PageComponentBaseSettingDto>(page.PageComponentBaseSetting);
            dto.PageComponentSettings = new List<PageComponentSettingDto>();

            foreach (var item in page.PageComponentSettings) {
                PageComponentSettingDto pageComponentSetting = new PageComponentSettingDto() {
                    Name = item.Name,
                    DisplayName = item.DisplayName,
                    Field1 = item.Field1,
                    Field2 = item.Field2,
                    Field3  = item.Field3,
                    Field4 = item.Field4,
                    Field5 = item.Field5
                };

                dto.PageComponentSettings.Add(pageComponentSetting);
            }

            if (page is CompositeComponent)
            {
                dto.ComponentType = "CompositeComponent";
            }
            else if (page is PageLeafComponent)
            {
                var pageLeafComponent = (PageLeafComponent)page;

                dto.TargetPageId = pageLeafComponent.TargetPageId;
                dto.ComponentType = "PageLeafComponent";
            }
            else
            {
                dto.ComponentType = "LeafComponent";
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

        public GetPageDataOutput GetPageData(GetPageDataInput input) 
        {
            var pageData = _pageDataManager.GetPageDataIncludeAllProperty(input.PageName, input.PageDataName);

            return new GetPageDataOutput()
            {
                PageData = _objectMapper.Map<PageDataDto>(pageData)
            };
        }
    }
}
