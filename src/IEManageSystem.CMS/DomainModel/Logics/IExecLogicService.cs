using Abp.Domain.Services;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public interface IExecLogicService : IDomainService
    {
        void Exec(
            Logic logic,
            string pageName,
            string pageComponentBaseSign,
            string pageDataName,
            string contentComponentDataSign,
            int userId,
            string request);
    }
}
