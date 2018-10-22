using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Models;
using IEIdentityServer.Core.Entitys.IdentityService.Clients.ClientGrantTypes;
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

        private ClientGrantTypeGroupManager _clientGrantTypeManager { get; set; }

        public ClientManager(
            IIEIdentityServerRepository<IdentityServer4.EntityFramework.Entities.Client> repository,
            ClientGrantTypeGroupManager clientGrantTypeManager
            )
        {
            _repository = repository;

            _clientGrantTypeManager = clientGrantTypeManager;
        }

        
        public void AddClient(
            string clientId,
            string allowedGrantTypes,
            List<string> clientSecrets,
            List<string> redirectUris,
            List<string> postLogoutRedirectUris,
            List<string> allowedScopes,
            bool allowOfflineAccess
            )
        {
            IdentityServer4.EntityFramework.Entities.Client client = CreateClient(clientId, allowedGrantTypes, clientSecrets, redirectUris, postLogoutRedirectUris, allowedScopes, allowOfflineAccess);

            _repository.Insert(client);

            _repository.SaveChange();
        }

        public void RemoveClient(
            int id
            )
        {
            IdentityServer4.EntityFramework.Entities.Client client = _repository.FirstOrDefault(id);
            if (client == null) {
                throw new Exception("不存在的客户端");
            }

            _repository.Remove(client);

            _repository.SaveChange();
        }

        public void UpdateClient(
            int id,
            string clientId,
            string allowedGrantType,
            List<string> redirectUris,
            List<string> postLogoutRedirectUris,
            List<string> allowedScopes,
            bool allowOfflineAccess
            )
        {
            Expression<Func<IdentityServer4.EntityFramework.Entities.Client, object>>[] propertySelectors = new Expression<Func<IdentityServer4.EntityFramework.Entities.Client, object>>[] {
                e=>e.AllowedScopes,
                e=>e.AllowedGrantTypes,
                e=>e.ClientSecrets,
                e=>e.RedirectUris,
                e=>e.PostLogoutRedirectUris,
            };

            IdentityServer4.EntityFramework.Entities.Client client = _repository.GetAllInclude(propertySelectors).FirstOrDefault(e => e.Id == id);
            if (client == null)
            {
                throw new Exception("不存在的客户端");
            }

            IdentityServer4.EntityFramework.Entities.Client newClient = CreateClient(clientId, allowedGrantType, new List<string>(), redirectUris, postLogoutRedirectUris, allowedScopes, allowOfflineAccess);

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
            Expression<Func<IdentityServer4.EntityFramework.Entities.Client, object>>[] propertySelectors = new Expression<Func<IdentityServer4.EntityFramework.Entities.Client, object>>[] {
                e=>e.ClientSecrets,
            };

            IdentityServer4.EntityFramework.Entities.Client newclient = _repository.GetAllInclude(propertySelectors).FirstOrDefault(e => e.Id == id);
            if (newclient == null)
            {
                throw new Exception("不存在的客户端");
            }

            var client = CreateClient("", "", clientSecrets, new List<string>(), new List<string>(), new List<string>(), true);

            newclient.ClientSecrets = client.ClientSecrets;

            _repository.SaveChange();
        }

        private IdentityServer4.EntityFramework.Entities.Client CreateClient (
            string clientId,
            string allowedGrantType,
            List<string> clientSecrets,
            List<string> redirectUris,
            List<string> postLogoutRedirectUris,
            List<string> allowedScopes,
            bool allowOfflineAccess
            ) 
        {
            ICollection<string> clientGrantTypeList = new List<string>();

            // 认证客户端认证类型是否存在
            if ( !string.IsNullOrEmpty(allowedGrantType) && !_clientGrantTypeManager.IsExistClientGrantType(allowedGrantType))
            {
                throw new Exception("不存在的客户端认证类型[" + allowedGrantType + "]");
            }

            if (!string.IsNullOrEmpty(allowedGrantType)) {
                clientGrantTypeList = _clientGrantTypeManager.GetClientGrantTypesForName(allowedGrantType);
            }

            List<IdentityServer4.Models.Secret> clientSecretList = new List<IdentityServer4.Models.Secret>();
            clientSecrets.ForEach(e => {
                clientSecretList.Add(new IdentityServer4.Models.Secret(e.Sha256()));
            });

            IdentityServer4.Models.Client client = new IdentityServer4.Models.Client()
            {
                ClientId = clientId,
                AllowedGrantTypes = clientGrantTypeList,
                ClientSecrets = clientSecretList,
                RedirectUris = redirectUris,
                PostLogoutRedirectUris = postLogoutRedirectUris,
                AllowedScopes = allowedScopes,
                AllowOfflineAccess = allowOfflineAccess,
            };

            return client.ToEntity();
        }
    }
}
