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
        public PageRepository(IDbContextProvider<IEManageSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public PageBase GetPageOfAllIncludes(string name) {
            var page = Context.Set<ContentPage>()
                .Include(e => e.ContentPagePeimissionCollection).ThenInclude(e=>e.ManagePermissions)
                .Include(e => e.ContentPagePeimissionCollection).ThenInclude(e => e.QueryPermissions)
                .Include(e => e.PageComponents).ThenInclude(e => e.PageComponentSettings).ThenInclude(e => e.SingleDatas)
                .FirstOrDefault(e => e.Name == name);

            return page;
        }
    }
}
