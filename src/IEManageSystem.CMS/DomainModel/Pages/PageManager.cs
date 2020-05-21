using Abp.Dependency;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.Repositorys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class PageManager : ITransientDependency
    {
        public const string HomeName = "home";

        public const string StaticPagePageDataName = "Index";

        public PageManager(IPageRepository pageRepository)
        {
            PageRepository = pageRepository;
        }

        public IPageRepository PageRepository { get; }

        public StaticPage CreateStaticPage(string pageName, string pageDisplayName)
        {
            PageData pageData = new PageData()
            {
                Name = StaticPagePageDataName,
                Title = pageDisplayName
            };

            StaticPage page = new StaticPage(pageName, pageData) {
                DisplayName = pageDisplayName
            };

            return page;
        }

        public void AddPage(PageBase page)
        {
            if (PageRepository.GetAll().Any(e => e.Name == page.Name))
            {
                throw new UserFriendlyException($"已存在名为{page.Name}的页面，请重新命名");
            }

            PageRepository.Insert(page);
        }

        public void DeletePage(string name)
        {
            if (name.ToLower() == HomeName)
            {
                throw new UserFriendlyException("不能删除主页");
            }

            var page = PageRepository.ThenInclude(e => e.PageComponents, e => e.PageComponentSettings, e => e.SingleDatas).FirstOrDefault(e=>e.Name == name);

            PageRepository.Delete(page);
        }

        public List<PageComponentBase> GetPageComponents(string name)
        {
            var page = PageRepository.ThenInclude(e => e.PageComponents, e => e.PageComponentSettings).FirstOrDefault(e => e.Name == name);

            if (page == null)
            {
                throw new UserFriendlyException("未找到页面");
            }

            if (page.PageComponents == null)
            {
                return new List<PageComponentBase>();
            }

            return page.PageComponents.ToList();
        }

        public void UpdatePageComponents(string name, List<PageComponentBase> pageComponents)
        {
            var page = PageRepository.ThenInclude(e => e.PageComponents, e=>e.PageComponentSettings, e=>e.SingleDatas).FirstOrDefault(e => e.Name == name);
            page.PageComponents = new List<PageComponentBase>();

            foreach (var item in pageComponents) {
                page.PageComponents.Add(item);
            }
        }
    }
}
