using IEIdentityServer.Core.Entitys.IdentityService.Clients;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages
{
    public class ClientManageAppService: IClientManageAppService
    {
        private ClientManager _clientManager { get; set; }

        public ClientManageAppService(
            ClientManager clientManager
            )
        {
            _clientManager = clientManager;
        }

        public async Task<AddClientOutput> AddClient(AddClientInput input)
        {
            _clientManager.AddClient(
                input.ClientId, 
                input.AllowedGrantTypes, 
                input.ClientSecrets, 
                input.RedirectUris, 
                input.PostLogoutRedirectUris, 
                input.AllowedScopes, 
                input.AllowOfflineAccess);

            return new AddClientOutput();
        }

        public async Task<RemoveClientOutput> RemoveClient(RemoveClientInput input)
        {
            _clientManager.RemoveClient(input.clientId);

            return new RemoveClientOutput();
        }

        public async Task<UpdateClientOutput> UpdateClient(UpdateClientInput input)
        {
            _clientManager.UpdateClient(
                input.ClientId,
                input.AllowedGrantTypes,
                input.ClientSecrets,
                input.RedirectUris,
                input.PostLogoutRedirectUris,
                input.AllowedScopes,
                input.AllowOfflineAccess);

            return new UpdateClientOutput();
        }
    }
}
