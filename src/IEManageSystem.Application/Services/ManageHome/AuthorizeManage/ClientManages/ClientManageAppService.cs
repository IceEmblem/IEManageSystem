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
            if (!Regular.IsMatchLettersNumbers(input.ClientId))
            {
                return new AddClientOutput() { ErrorMessage = "客户端Id只能输入数字和字母" };
            }

            if (!Regular.IsMatchLettersNumbers(input.ClientSecret))
            {
                return new AddClientOutput() { ErrorMessage = "密匙只能输入数字和字母" };
            }

            _clientManager.AddClient(
                input.ClientId, 
                input.AllowedGrantType, 
                new List<string>() { input.ClientSecret }, 
                new List<string>() { input.RedirectUri }, 
                new List<string>() { input.PostLogoutRedirectUri }, 
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
            if (!Regular.IsMatchLettersNumbers(input.ClientId))
            {
                return new UpdateClientOutput() { ErrorMessage = "客户端Id只能输入数字和字母" };
            }

            if (!string.IsNullOrEmpty(input.ClientSecret) && !Regular.IsMatchLettersNumbers(input.ClientSecret)) {
                return new UpdateClientOutput() { ErrorMessage = "密匙只能输入数字和字母" };
            }

            if (!string.IsNullOrEmpty(input.ClientSecret) && (input.ClientSecret.Length < 6 || input.ClientSecret.Length > 50)) {
                return new UpdateClientOutput() { ErrorMessage = "客户端密匙长度必须大于或等于6，小于或等于50" };
            }

            _clientManager.UpdateClient(
                input.Id,
                input.ClientId,
                input.AllowedGrantType,
                new List<string>() { input.RedirectUri },
                new List<string>() { input.PostLogoutRedirectUri },
                input.AllowedScopes,
                input.AllowOfflineAccess);

            // 如果密匙不为空，则更新
            if (!string.IsNullOrEmpty(input.ClientSecret)) {
                _clientManager.UpdateSecrets(
                    input.Id,
                    new List<string>() { input.ClientSecret }
                    );
            }

            return new UpdateClientOutput();
        }
    }
}
