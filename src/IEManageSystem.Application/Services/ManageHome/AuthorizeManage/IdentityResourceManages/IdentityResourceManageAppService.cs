using IEManageSystem.CustomRepositoryI;
using IEManageSystem.Dtos.IdentityService;
using IEManageSystem.Entitys.IdentityService;
using IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages
{
    public class IdentityResourceManageAppService: IIdentityResourceManageAppService
    {
        private IRepositoryIdentityConfig<IEIdentityResource> _IdentityResourceRepository { get; set; }

        public IdentityResourceManageAppService(
            IRepositoryIdentityConfig<IEIdentityResource> identityResourceRepository
            )
        {
            _IdentityResourceRepository = identityResourceRepository;
        }

        public async Task<GetIdentityResourceOutput> GetIdentityResource(GetIdentityResourceInput input)
        {
            List<IEIdentityResource> identityResources = null;
            try
            {
                identityResources = _IdentityResourceRepository.AsNoTracking(new System.Linq.Expressions.Expression<Func<IEIdentityResource, object>>[] { }).ToList();
            }
            catch (Exception ex) {
                string a = ex.Message;
            }
            

            return new GetIdentityResourceOutput() { IdentityResources = AutoMapper.Mapper.Map<List<IdentityResourceDto>>(identityResources) };
        }
    }
}
