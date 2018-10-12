using IEManageSystem.Dtos;
using IEManageSystem.Dtos.IdentityService;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto
{
    public class GetClientsOutput:OutputDtoBase
    {
        public List<ClientDto> Clients { get; set; }
    }
}
