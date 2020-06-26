using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    public interface IPageDataQueryAppService : IApplicationService
    {
        GetPageDatasOutput GetPageDatas(GetPageDatasInput input);

        GetPageDataOutput GetPageData(GetPageDataInput input);
    }
}
