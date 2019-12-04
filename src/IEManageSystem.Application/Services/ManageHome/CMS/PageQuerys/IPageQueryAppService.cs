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

        GetPageComponentOutput GetPageComponent(GetPageComponentInput input);

        GetPageDatasOutput GetPageDatas(GetPageDatasInput input);

        GetComponentDataOutput GetComponentDatas(GetComponentDataInput input);
    }
}
