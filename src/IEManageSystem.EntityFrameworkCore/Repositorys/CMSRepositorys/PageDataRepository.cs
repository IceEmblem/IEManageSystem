using Abp.EntityFrameworkCore;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Repositorys.CMSRepositorys
{
    public class PageDataRepository : EfRepository<PageData, int>, IPageDataRepository
    {
        public PageDataRepository(IDbContextProvider<IEManageSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
