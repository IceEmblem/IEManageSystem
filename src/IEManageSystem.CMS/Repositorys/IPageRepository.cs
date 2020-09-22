using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Repositorys;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Linq.Expressions;

namespace IEManageSystem.CMS.Repositorys
{
    public interface IPageRepository : IEfRepository<PageBase, int>
    {
        PageBase GetPageOfAllIncludes(string name);

        IQueryable<ContentPage> GetContentPages();

        IQueryable<ContentPage> GetContentPages<TProperty>(Expression<Func<ContentPage, TProperty>> navigationPropertyPath);

        IQueryable<ContentPage> GetContentPages<TProperty, TThenProperty>(Expression<Func<ContentPage, IQueryable
            <TProperty>>> navigationPropertyPath, Expression<Func<TProperty, TThenProperty>> thenNavigationPropertyPath);

        IQueryable<ContentPage> GetContentPagesIncludePermissionCollection();
    }
}
