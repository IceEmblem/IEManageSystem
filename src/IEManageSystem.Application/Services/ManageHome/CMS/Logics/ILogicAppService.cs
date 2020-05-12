using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.CMS.Logics.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Logics
{
    public interface ILogicAppService : IApplicationService
    {
        GetLogicsOutput GetLogics(GetLogicsInput input);

        RegisterLogicOutput RegisterLogic(RegisterLogicInput input);
    }
}
