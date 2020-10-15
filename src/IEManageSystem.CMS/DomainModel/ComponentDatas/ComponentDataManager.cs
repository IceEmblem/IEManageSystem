using Abp.Dependency;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Repositorys;
using IEManageSystem.Web;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.ComponentDatas
{
    public class ComponentDataManager : ITransientDependency
    {
        private IIEMemoryCache _cache { get; }

        public IEfRepository<ContentComponentData, int> ComponentDataRepository { get; }

        public ComponentDataManager(
            IIEMemoryCache cache,
            IEfRepository<ContentComponentData, int> componentDataRepository) 
        {
            _cache = cache;
            ComponentDataRepository = componentDataRepository;
        }

        public void UpdateContentComponentData(PageData pageData, List<ContentComponentData> contentComponentDatas)
        {
            var oldDatas = ComponentDataRepository.GetAllIncluding(e => e.SingleDatas).OfType<ContentComponentData>().Where(e => e.PageDataId == pageData.Id).ToList();

            oldDatas.ForEach(item => {
                ComponentDataRepository.Delete(item);
            });

            contentComponentDatas.ForEach(item =>
            {
                item.PageData = pageData;
                ComponentDataRepository.Insert(item);
            });
        }

        public void DeleteContentComponentData(PageData post) 
        {
            var oldDatas = ComponentDataRepository.GetAllIncluding(e => e.SingleDatas).OfType<ContentComponentData>().Where(e => e.PageDataId == post.Id).ToList();

            oldDatas.ForEach(item => {
                ComponentDataRepository.Delete(item);
            });
        }
    }
}
