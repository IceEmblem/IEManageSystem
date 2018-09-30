using IEManageSystem.Dtos.IdentityService;
using IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using IEIdentityServer.Core.RepositoriesI;
using IdentityServer4.EntityFramework.Entities;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages
{
    public class IdentityResourceManageAppService: IIdentityResourceManageAppService
    {
        private IIEIdentityServerRepository<IdentityResource> _IdentityResourceRepository { get; set; }

        public IdentityResourceManageAppService(
            IIEIdentityServerRepository<IdentityResource> identityResourceRepository
            )
        {
            _IdentityResourceRepository = identityResourceRepository;
        }

        public async Task<GetIdentityResourceOutput> GetIdentityResource(GetIdentityResourceInput input)
        {
            List<IdentityResource> identityResources = identityResources = _IdentityResourceRepository.GetAllInclude(new System.Linq.Expressions.Expression<Func<IdentityResource, object>>[] {
                    e=>e.UserClaims,
                }).OrderByDescending(e => e.Id).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            return new GetIdentityResourceOutput() { IdentityResources = AutoMapper.Mapper.Map<List<IdentityResourceDto>>(identityResources) };
        }
    }
}
