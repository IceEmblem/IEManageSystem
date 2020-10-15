using IEManageSystem.JwtAuthentication;
using IEManageSystem.Services.ManageHome.CMS.Logics;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Controllers.CMS.Logics
{
    [Route("api/[controller]/[action]")]
    public class LogicExecController : IEManageSystemControllerBase
    {
        private LogicExecAppService _logicExecAppService { get; }

        private ClaimManager _claimManager { get; }

        public LogicExecController(LogicExecAppService logicExecAppService, ClaimManager claimManager) {
            _logicExecAppService = logicExecAppService;
            _claimManager = claimManager;
        }

        [HttpPost]
        public ActionResult<Services.ManageHome.CMS.Logics.Dto.ExecLogicOutput> ExecLogic([FromBody] Dto.ExecLogicInput input)
        {
            Services.ManageHome.CMS.Logics.Dto.ExecLogicInput appInput = new Services.ManageHome.CMS.Logics.Dto.ExecLogicInput();
            appInput.LogicName = input.LogicName;
            appInput.PageName = input.PageName;
            appInput.PageDataName = input.PageDataName;
            appInput.ContentComponentDataSign = input.ContentComponentDataSign;
            appInput.Request = input.Request;

            if (User.Identity.IsAuthenticated) {
                var userClaimInfo = _claimManager.CreateUserClaimInfo(User.Claims);

                int userId;
                if (int.TryParse(userClaimInfo.Subject, out userId)) {
                    appInput.UserId = userId;
                }
            }

            return _logicExecAppService.ExecLogic(appInput);
        }
    }
}
