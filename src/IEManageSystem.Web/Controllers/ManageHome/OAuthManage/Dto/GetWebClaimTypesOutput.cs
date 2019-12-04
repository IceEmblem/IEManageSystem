using IEManageSystem.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Controllers.ManageHome.OAuthManage.Dto
{
    public class GetWebClaimTypesOutput:OutputDtoBase
    {
        public List<string> WebClaimTypes { get; set; }
    }
}
