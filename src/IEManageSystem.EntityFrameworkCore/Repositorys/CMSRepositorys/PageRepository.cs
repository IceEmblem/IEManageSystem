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
            PageBase page = Context.Set<ContentPage>()
                .Include(e => e.ContentPagePermissionCollection).ThenInclude(e => e.ContentPagePermissions)
                .FirstOrDefault(e => e.Name == name);

            if (page == null) {
                page = Context.Set<StaticPage>()
                .FirstOrDefault(e => e.Name == name);
            }

            return page;
        }
    }
}
