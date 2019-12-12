using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.PageQuerys
{
    public interface IPageQueryAppService: IApplicationService
    {
        GetPagesOutput GetPages(GetPagesInput input);

        GetPageOutput GetPage(GetPageInput input);

        GetPageDatasOutput GetPageDatas(GetPageDatasInput input);

        GetPageDataOutput GetPageData(GetPageDataInput input);
    }
}
