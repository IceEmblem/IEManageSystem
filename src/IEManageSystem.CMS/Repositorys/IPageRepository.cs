using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Repositorys;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.Repositorys
{
    public interface IPageRepository : IEfRepository<PageBase, int>
    {
    }
}
