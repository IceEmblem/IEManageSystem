using Abp.EntityFrameworkCore;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Repositorys.CMSRepositorys
{
    public class PageComponentRepository : EfRepository<PageComponent, int>, IPageComponentRepository
    {
        public PageComponentRepository(IDbContextProvider<IEManageSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public IQueryable<PageComponent> GetPageComponentOfAllIncludesForPageName(string pageName)
        {
            return Context.Set<PageComponent>().Include(e => e.PageComponentSettings).ThenInclude(e => e.SingleDatas).Where(e => e.Page.Name == pageName);
        }
    }
}
