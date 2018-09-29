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
    }
}
