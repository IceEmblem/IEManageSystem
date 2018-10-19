using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.Entitys.IdentityService.Clients;
using IEIdentityServer.Core.RepositoriesI;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using IEManageSystem.Dtos.IdentityService;
using System.Linq.Expressions;
using UtilityAction.Other;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages
{
    public class ClientManageAppService: IClientManageAppService
    {
        private ClientManager _clientManager { get; set; }

        private IIEIdentityServerRepository<Client> _clientRepository { get; set; }

        public ClientManageAppService(
            ClientManager clientManager,
            IIEIdentityServerRepository<Client> clientRepository
            )
        {
            _clientManager = clientManager;

            _clientRepository = clientRepository;
        }

        public async Task<GetClientsOutput> GetClients(GetClientsInput input)
        {
            Expression<Func<Client, object>>[] clientLoad = new Expression<Func<Client, object>>[] {
                e=>e.AllowedGrantTypes,
                e=>e.RedirectUris,
                e=>e.PostLogoutRedirectUris,
                e=>e.AllowedScopes,
            };
            var clients = _clientRepository.GetAllInclude(clientLoad).OrderByDescending(e => e.Id).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            return new GetClientsOutput() { Clients = AutoMapper.Mapper.Map<List<ClientDto>>(clients) };
        }

        public async Task<AddClientOutput> AddClient(AddClientInput input)
        {
            if (!Regular.IsMatchUrl(input.RedirectUris) || !Regular.IsMatchUrl(input.PostLogoutRedirectUris)) {
                return new AddClientOutput() { ErrorMessage = "请输入Url格式，例[http://abc.com/abc]" };
            }

            _clientManager.AddClient(
                input.ClientId, 
                input.AllowedGrantTypes, 
                new List<string>() { input.ClientSecrets }, 
                new List<string>() { input.RedirectUris }, 
                new List<string>() { input.PostLogoutRedirectUris }, 
                input.AllowedScopes, 
                input.AllowOfflineAccess);

            return new AddClientOutput();
        }

        public async Task<RemoveClientOutput> RemoveClient(RemoveClientInput input)
        {
            _clientManager.RemoveClient(input.Id);

            return new RemoveClientOutput();
        }

        public async Task<UpdateClientOutput> UpdateClient(UpdateClientInput input)
        {
            _clientManager.UpdateClient(
                input.Id,
                input.ClientId,
                input.AllowedGrantTypes,
                new List<string>() { input.RedirectUris },
                new List<string>() { input.PostLogoutRedirectUris },
                input.AllowedScopes,
                input.AllowOfflineAccess);

            // 如果密匙不为空，则更新
            if (!string.IsNullOrEmpty(input.ClientSecrets)) {
                _clientManager.UpdateSecrets(
                    input.Id,
                    new List<string>() { input.ClientSecrets }
                    );
            }

            return new UpdateClientOutput();
        }
    }
}
