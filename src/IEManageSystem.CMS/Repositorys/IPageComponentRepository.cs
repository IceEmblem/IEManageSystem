using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.Repositorys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.Repositorys
{
    public interface IPageComponentRepository : IEfRepository<PageComponentBase, int>
    {
        IQueryable<PageComponentBase> GetPageComponentOfAllIncludesForPageName(string pageName);
    }
}
