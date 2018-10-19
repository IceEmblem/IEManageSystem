using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Mappers;
using IEIdentityServer.Core.RepositoriesI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEIdentityServer.Core.Entitys.IdentityService.Clients
{
    public class ClientManager : ITransientDependency
    {
        private IIEIdentityServerRepository<IdentityServer4.EntityFramework.Entities.Client> _repository { get; set; }

        private ClientGrantTypeManager _clientGrantTypeManager { get; set; }

        public ClientManager(
            IIEIdentityServerRepository<IdentityServer4.EntityFramework.Entities.Client> repository,
            ClientGrantTypeManager clientGrantTypeManager
            )
        {
            _repository = repository;

            _clientGrantTypeManager = clientGrantTypeManager;
        }

        
        public void AddClient(
            string clientId,
            List<string> allowedGrantTypes,
            List<string> clientSecrets,
            List<string> redirectUris,
            List<string> postLogoutRedirectUris,
            List<string> allowedScopes,
            bool allowOfflineAccess
            )
        {
            // 认证客户端认证类型是否存在
            foreach (var item in allowedGrantTypes) {
                if (!_clientGrantTypeManager.IsExistClientGrantType(item))
                {
                    throw new Exception("不存在的客户端认证类型[" + item + "]");
                }
            }

            Client client = CreateClient(clientId, allowedGrantTypes, clientSecrets, redirectUris, postLogoutRedirectUris, allowedScopes, allowOfflineAccess);

            _repository.Insert(client);

            _repository.SaveChange();
        }

        public void RemoveClient(
            int id
            )
        {
            Client client = _repository.FirstOrDefault(id);
            if (client == null) {
                throw new Exception("不存在的客户端");
            }

            _repository.Remove(client);

            _repository.SaveChange();
        }

        public void UpdateClient(
            int id,
            string clientId,
            List<string> allowedGrantTypes,
            List<string> redirectUris,
            List<string> postLogoutRedirectUris,
            List<string> allowedScopes,
            bool allowOfflineAccess
            )
        {
            // 认证客户端认证类型是否存在
            foreach (var item in allowedGrantTypes)
            {
                if (!_clientGrantTypeManager.IsExistClientGrantType(item))
                {
                    throw new Exception("不存在的客户端认证类型[" + item + "]");
                }
            }

            Expression<Func<Client, object>>[] propertySelectors = new Expression<Func<Client, object>>[] {
                e=>e.AllowedScopes,
                e=>e.AllowedGrantTypes,
                e=>e.ClientSecrets,
                e=>e.RedirectUris,
                e=>e.PostLogoutRedirectUris,

            };

            Client client = _repository.GetAllInclude(propertySelectors).FirstOrDefault(e => e.Id == id);
            if (client == null)
            {
                throw new Exception("不存在的客户端");
            }

            Client newClient = CreateClient(clientId, allowedGrantTypes, new List<string>(), redirectUris, postLogoutRedirectUris, allowedScopes, allowOfflineAccess);

            client.ClientId = newClient.ClientId;
            client.AllowedScopes = newClient.AllowedScopes;
            client.AllowedGrantTypes = newClient.AllowedGrantTypes;
            client.RedirectUris = newClient.RedirectUris;
            client.PostLogoutRedirectUris = newClient.PostLogoutRedirectUris;
            client.AllowOfflineAccess = newClient.AllowOfflineAccess;

            _repository.SaveChange();
        }

        public void UpdateSecrets(
            int id,
            List<string> clientSecrets
            )
        {
            Expression<Func<Client, object>>[] propertySelectors = new Expression<Func<Client, object>>[] {
                e=>e.ClientSecrets,
            };

            Client client = _repository.GetAllInclude(propertySelectors).FirstOrDefault(e => e.Id == id);
            if (client == null)
            {
                throw new Exception("不存在的客户端");
            }

            List<ClientSecret> clientSecretList = new List<ClientSecret>();
            clientSecrets.ForEach(e => {
                clientSecretList.Add(new ClientSecret()
                {
                    Value = e,
                });
            });

            client.ClientSecrets = clientSecretList;

            _repository.SaveChange();
        }

        private Client CreateClient (
            string clientId,
            List<string> allowedGrantTypes,
            List<string> clientSecrets,
            List<string> redirectUris,
            List<string> postLogoutRedirectUris,
            List<string> allowedScopes,
            bool allowOfflineAccess
            ) 
        {
            List<ClientGrantType> clientGrantTypeList = new List<ClientGrantType>();
            allowedGrantTypes.ForEach(e => {
                clientGrantTypeList.Add(new ClientGrantType()
                {
                    GrantType = e,
                });
            });

            List<ClientSecret> clientSecretList = new List<ClientSecret>();
            clientSecrets.ForEach(e => {
                clientSecretList.Add(new ClientSecret()
                {
                    Value = e,
                });
            });

            List<ClientRedirectUri> clientRedirectUriList = new List<ClientRedirectUri>();
            redirectUris.ForEach(e => {
                clientRedirectUriList.Add(new ClientRedirectUri()
                {
                    RedirectUri = e,
                });
            });

            List<ClientPostLogoutRedirectUri> clientPostLogoutRedirectUriList = new List<ClientPostLogoutRedirectUri>();
            postLogoutRedirectUris.ForEach(e => {
                clientPostLogoutRedirectUriList.Add(new ClientPostLogoutRedirectUri()
                {
                    PostLogoutRedirectUri = e,
                });
            });

            List<ClientScope> clientScopeList = new List<ClientScope>();
            allowedScopes.ForEach(e=> {
                clientScopeList.Add(new ClientScope() {
                    Scope = e,
                });
            });

            Client client = new Client()
            {
                ClientId = clientId,
                AllowedGrantTypes = clientGrantTypeList,
                ClientSecrets = clientSecretList,
                RedirectUris = clientRedirectUriList,
                PostLogoutRedirectUris = clientPostLogoutRedirectUriList,
                AllowedScopes = clientScopeList,
                AllowOfflineAccess = allowOfflineAccess,
            };

            return client;
        }
    }
}
