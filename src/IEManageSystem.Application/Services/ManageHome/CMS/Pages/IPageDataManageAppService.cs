using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    public interface IPageDataManageAppService : IApplicationService
    {
        AddPageDataOutput AddPageData(AddPageDataInput input);

        UpdatePageDataOutput UpdatePageData(UpdatePageDataInput input);

        UpdatePageDataOutput UpdatePageDataOfCreator(UpdatePageDataInput input);

        DeletePageDataOutput DeletePageData(DeletePageDataInput input);

        DeletePageDataOutput DeletePageDataOfCreator(DeletePageDataInput input);

        UpdateComponentDataOutput UpdateComponentData(UpdateComponentDataInput input);

        UpdateComponentDataOutput UpdateComponentDataOfCreator(UpdateComponentDataInput input);
    }
}
