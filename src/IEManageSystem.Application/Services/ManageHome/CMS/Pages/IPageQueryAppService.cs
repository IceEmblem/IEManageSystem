using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    public interface IPageQueryAppService: IApplicationService
    {
        GetPagesOutput GetPages(GetPagesInput input);

        GetPageOutput GetPage(GetPageInput input);
    }
}
