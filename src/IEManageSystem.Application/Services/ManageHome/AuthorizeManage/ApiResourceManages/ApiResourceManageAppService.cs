using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.Entitys.IdentityService.ApiResources;
using IEIdentityServer.Core.RepositoriesI;
using IEManageSystem.Dtos.IdentityService;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages.Dto;
using IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages
{
    public class ApiResourceManageAppService: IApiResourceManageAppService
    {
        private IIEIdentityServerRepository<ApiResource> _apiResourceRepository { get; set; }

        private ApiResourceManager _apiResourceManager { get; set; }

        public ApiResourceManageAppService(
            IIEIdentityServerRepository<ApiResource> apiResourceRepository,
            ApiResourceManager apiResourceManager
            )
        {
            _apiResourceRepository = apiResourceRepository;

            _apiResourceManager = apiResourceManager;
        }

        /// <summary>
        /// 获取Api资源列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetApiResourceOutput> GetApiResources(GetApiResourceInput input)
        {
            List<ApiResource> resources = _apiResourceRepository.GetAllInclude(new System.Linq.Expressions.Expression<Func<ApiResource, object>>[] {
                    e=>e.UserClaims,
                }).OrderByDescending(e => e.Id).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            return new GetApiResourceOutput() { ApiResources = AutoMapper.Mapper.Map<List<ApiResourceDto>>(resources) };
        }

        /// <summary>
        /// 添加资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<AddApiResourceOutput> AddApiResource(AddApiResourceInput input)
        {
            _apiResourceManager.AddResource(input.Name, input.DisplayName, input.Description, input.Claims);

            return new AddApiResourceOutput();
        }

        /// <summary>
        /// 删除Api资源
        /// </summary>
        /// <returns></returns>
        public async Task<DeleteApiResourceOutput> DeleteApiResource(DeleteApiResourceInput input)
        {
            ApiResource resource = _apiResourceRepository.FirstOrDefault(input.ApiResourceId);
            if (resource == null) {
                return new DeleteApiResourceOutput() { ErrorMessage = "找不到Api资源" };
            }

            _apiResourceManager.RemoveApiResource(input.ApiResourceId);
            return new DeleteApiResourceOutput();
        }

        /// <summary>
        /// 更新Api资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<UpdateApiResourceOutput> UpdateApiResource(UpdateApiResourceInput input)
        {
            _apiResourceManager.UpdateApiResource(input.Id, input.Name, input.DisplayName, input.Description, input.Claims);

            return new UpdateApiResourceOutput();
        }
    }
}
