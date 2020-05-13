using Abp.EntityFrameworkCore;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Repositorys.CMSRepositorys
{
    public class PageRepository : EfRepository<PageBase, int>, IPageRepository
    {
        public const string HomeName = "home";

        public PageRepository(IDbContextProvider<IEManageSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public PageBase GetPageIncludePageDataAllProperty(string pageName) {
            return Context.Pages.Include(e => e.PageDatas).ThenInclude(e => e.ContentComponentDatas).ThenInclude(e => e.SingleDatas).FirstOrDefault(e=>e.Name == pageName);
        }
    }
}
