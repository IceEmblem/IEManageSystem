using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.RepositoriesI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEIdentityServer.Core.Entitys.IdentityService.ApiResources
{
    public class ApiResourceManager: ITransientDependency
    {
        private IIEIdentityServerRepository<ApiResource> _repository { get; set; }

        public ApiResourceManager(
            IIEIdentityServerRepository<ApiResource> repository
            )
        {
            _repository = repository;
            // IdentityServer4.EntityFramework.Entities.Client
        }

        /// <summary>
        /// 添加资源
        /// </summary>
        /// <param name="name"></param>
        /// <param name="displayName"></param>
        /// <param name="description"></param>
        /// <param name="useClaims"></param>
        public void AddResource(
            string name,
            string displayName,
            string description,
            List<string> useClaims
            )
        {
            List<ApiResourceClaim> claims = new List<ApiResourceClaim>();
            useClaims.ForEach(e => claims.Add(new ApiResourceClaim() { Type = e }));

            ApiResource resource = new ApiResource()
            {
                Name = name,
                DisplayName = displayName,
                Description = description,
                UserClaims = claims
            };

            _repository.Insert(resource);
            _repository.SaveChange();
        }

        /// <summary>
        /// 更新资源
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="dispalyName"></param>
        /// <param name="description"></param>
        /// <param name="useClaims"></param>
        public void UpdateApiResource(
            int id,
            string name,
            string dispalyName,
            string description,
            List<string> useClaims
            )
        {
            Expression<Func<ApiResource, object>>[] propertySelectors = new Expression<Func<ApiResource, object>>[] {
                e=>e.UserClaims,
            };
            var resource = _repository.GetAllInclude(propertySelectors).FirstOrDefault(e => e.Id == id);
            if (resource == null)
            {
                throw new Exception("未找到资源");
            }

            List<ApiResourceClaim> claims = new List<ApiResourceClaim>();
            useClaims.ForEach(e => claims.Add(new ApiResourceClaim() { Type = e }));

            resource.Name = name;
            resource.DisplayName = dispalyName;
            resource.Description = description;
            resource.UserClaims = claims;

            _repository.SaveChange();
        }

        /// <summary>
        /// 删除资源
        /// </summary>
        /// <param name="id"></param>
        public void RemoveApiResource(int id)
        {
            var resource = _repository.FirstOrDefault(id);
            if (resource == null)
            {
                throw new Exception("未找到资源");
            }
            _repository.Remove(resource);

            _repository.SaveChange();
        }
    }
}
