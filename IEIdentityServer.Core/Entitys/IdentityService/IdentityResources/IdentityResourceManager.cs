using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.RepositoriesI;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEIdentityServer.Core.Entitys.IdentityService.IdentityResources
{
    public class IdentityResourceManager: ITransientDependency
    {
        private IIEIdentityServerRepository<IdentityResource> _repository { get; set; }

        public IdentityResourceManager(
            IIEIdentityServerRepository<IdentityResource> repository)
        {
            _repository = repository;
        }

        public void AddIdentityResource(
            string name,
            string dispalyName,
            string description,
            List<string> useClaims
            )
        {
            List<IdentityClaim> identityClaims = new List<IdentityClaim>();
            useClaims.ForEach(e=> identityClaims.Add(new IdentityClaim() { Type = e }));

            IdentityResource identityResource = new IdentityResource() {
                Name = name,
                DisplayName = dispalyName,
                Description = description,
                UserClaims = identityClaims,
            };

            _repository.Insert(identityResource);
            _repository.SaveChange();
        }

        public void RemoveIdentityResource(int id)
        {
            var identityResource = _repository.FirstOrDefault(id);
            if (identityResource == null)
            {
                throw new Exception("未找到资源");
            }
            _repository.Remove(identityResource);

            _repository.SaveChange();
        }
    }
}
