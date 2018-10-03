using IEManageSystem.Dtos.IdentityService;
using IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using IEIdentityServer.Core.RepositoriesI;
using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.Entitys.IdentityService.IdentityResources;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages
{
    public class IdentityResourceManageAppService: IIdentityResourceManageAppService
    {
        private IIEIdentityServerRepository<IdentityResource> _IdentityResourceRepository { get; set; }

        private IdentityResourceManager _IdentityResourceManager { get; set; }

        public IdentityResourceManageAppService(
            IIEIdentityServerRepository<IdentityResource> identityResourceRepository,
            IdentityResourceManager identityResourceManager
            )
        {
            _IdentityResourceRepository = identityResourceRepository;

            _IdentityResourceManager = identityResourceManager;
        }

        /// <summary>
        /// 获取身份资源列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetIdentityResourceOutput> GetIdentityResource(GetIdentityResourceInput input)
        {
            List<IdentityResource> identityResources = identityResources = _IdentityResourceRepository.GetAllInclude(new System.Linq.Expressions.Expression<Func<IdentityResource, object>>[] {
                    e=>e.UserClaims,
                }).OrderByDescending(e => e.Id).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            return new GetIdentityResourceOutput() { IdentityResources = AutoMapper.Mapper.Map<List<IdentityResourceDto>>(identityResources) };
        }

        /// <summary>
        /// 添加身份资源
        /// </summary>
        /// <returns></returns>
        public async Task<AddIdentityResourceOutput> AddIdentityResource(AddIdentityResourceInput input)
        {
            _IdentityResourceManager.AddIdentityResource(input.Name, input.DisplayName, input.Description, input.Claims);

            return new AddIdentityResourceOutput();
        }

        /// <summary>
        /// 删除身份资源
        /// </summary>
        /// <returns></returns>
        public async Task<DeleteIdentityResourceOutput> DeleteIdentityResource(DeleteIdentityResourceInput input)
        {
            if (_IdentityResourceRepository.FirstOrDefault(input.IdentityResourceId) == null) {
                return new DeleteIdentityResourceOutput() { ErrorMessage = "未找到资源" };
            }

            _IdentityResourceManager.RemoveIdentityResource(input.IdentityResourceId);

            return new DeleteIdentityResourceOutput();
        }

        /// <summary>
        /// 更新身份资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<UpdateIdentityResourceOutput> UpdateIdentityResource(UpdateIdentityResourceInput input)
        {
            if (_IdentityResourceRepository.FirstOrDefault(input.Id) == null)
            {
                return new UpdateIdentityResourceOutput() { ErrorMessage = "未找到资源" };
            }

            _IdentityResourceManager.UpdateIdentityResource(input.Id, input.Name, input.DisplayName, input.Description, input.Claims);

            return new UpdateIdentityResourceOutput();
        }
    }
}
