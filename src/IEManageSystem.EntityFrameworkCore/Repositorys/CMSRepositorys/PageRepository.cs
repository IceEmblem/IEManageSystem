using Abp.EntityFrameworkCore;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public IQueryable<ContentPage> GetContentPages()
        {
            return Context.Set<ContentPage>();
        }

        public IQueryable<ContentPage> GetContentPages<TProperty>(Expression<Func<ContentPage, TProperty>> navigationPropertyPath)
        {
            return Context.Set<ContentPage>().Include(navigationPropertyPath);
        }

        public IQueryable<ContentPage> GetContentPages<TProperty, TThenProperty>(Expression<Func<ContentPage, IQueryable
            <TProperty>>> navigationPropertyPath, Expression<Func<TProperty, TThenProperty>> thenNavigationPropertyPath)
        {
            return Context.Set<ContentPage>().Include(navigationPropertyPath).ThenInclude(thenNavigationPropertyPath);
        }

        public IQueryable<ContentPage> GetContentPagesIncludePermissionCollection() 
        {
            return Context.Set<ContentPage>().Include(e => e.ContentPagePermissionCollection).ThenInclude(e => e.ContentPagePermissions);
        }
    }
}
