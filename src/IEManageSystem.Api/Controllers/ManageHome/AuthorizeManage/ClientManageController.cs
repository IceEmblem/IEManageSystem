using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Models;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage
{
    [Route("api/[controller]/[action]")]
    public class ClientManageController : IEManageSystemControllerBase
    {
        private ClientManageAppService _clientManageAppService { get; set; }

        public ClientManageController(
            ClientManageAppService clientManageAppService
            )
        {
            _clientManageAppService = clientManageAppService;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetClientsOutput>>> GetClients([FromBody]GetClientsInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetClientsOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetClientsOutput>(await _clientManageAppService.GetClients(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<AddClientOutput>>> AddClient([FromBody]AddClientInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<AddClientOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<AddClientOutput>(await _clientManageAppService.AddClient(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<RemoveClientOutput>>> RemoveClient([FromBody]RemoveClientInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<RemoveClientOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<RemoveClientOutput>(await _clientManageAppService.RemoveClient(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<UpdateClientOutput>>> UpdateClient([FromBody]UpdateClientInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<UpdateClientOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<UpdateClientOutput>(await _clientManageAppService.UpdateClient(input));
        }
    }
}