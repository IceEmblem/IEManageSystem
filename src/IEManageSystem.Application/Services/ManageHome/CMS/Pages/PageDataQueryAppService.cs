using Abp.Application.Services;
using Abp.ObjectMapping;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
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
    [RemoteService(false)]
    public class PageDataQueryAppService : IEManageSystemAppServiceBase, IPageDataQueryAppService
    {
        private readonly IObjectMapper _objectMapper;

        private PageDataManager _pageDataManager { get; set; }

        private IEfRepository<ContentComponentData, int> _componentDataRepository { get; set; }

        public PageDataQueryAppService(
            IObjectMapper objectMapper,
            PageDataManager pageDataManager,
            IEfRepository<ContentComponentData, int> componentDataRepository
            )
        {
            _objectMapper = objectMapper;

            _pageDataManager = pageDataManager;

            _componentDataRepository = componentDataRepository;
        }

        /// <summary>
        /// 获取页面文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public GetPageDatasOutput GetPageDatas(GetPageDatasInput input)
        {
            IEnumerable<PageData> pageDatas = null;
            if (input.EnablePageFilter)
            {
                pageDatas = _pageDataManager.PostRepository.GetAll().Where(e => input.PageIds.Contains(e.PageId));
            }
            else
            {
                pageDatas = _pageDataManager.PostRepository.GetAll();
            }

            if (!string.IsNullOrWhiteSpace(input.SearchKey)) {
                pageDatas = pageDatas.Where(e => e.Title.Contains(input.SearchKey));
            }
            
            int num = pageDatas.Count();
            pageDatas = pageDatas.OrderByDescending(e => e.Id).Skip((input.PageIndex - 1) * input.PageSize + input.Top).Take(input.PageSize).ToList();

            return new GetPageDatasOutput()
            {
                PageDatas = _objectMapper.Map<List<PageDataDto>>(pageDatas),
                ResourceNum = num,
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
            var pageData = _pageDataManager.PostRepository.FirstOrDefault(e => e.Page.Name == input.PageName && e.Name == input.PageDataName);

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
