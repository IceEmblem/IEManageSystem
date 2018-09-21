using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IEManageSystem.Api.Models;
using IEManageSystem.Api.Models.ConsentModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class ConsentController : IEManageSystemControllerBase
    {
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IClientStore _clientStore;
        private readonly IResourceStore _resourceStore;

        public ConsentController(
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IResourceStore resourceStore)
        {
            _interaction = interaction;
            _clientStore = clientStore;
            _resourceStore = resourceStore;
        }

        /// <summary>
        /// 获取授权项
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<ApiResultDataModel>> GetConsent(string returnUrl)
        {
            // 获取认证请求上下文
            var request = await _interaction.GetAuthorizationContextAsync(returnUrl);
            if (request != null)
            {
                // 获取认证的客户端
                var client = await _clientStore.FindEnabledClientByIdAsync(request.ClientId);
                if (client != null)
                {
                    // 获取资源域
                    var resources = await _resourceStore.FindEnabledResourcesByScopeAsync(client.AllowedScopes);
                    if (resources != null && (resources.IdentityResources.Any() || resources.ApiResources.Any()))
                    {
                        // 执行成功
                        return new ApiResultDataModel() { IsSuccess = true, Value = CreateConsentModel(returnUrl, request, client, resources) };
                    }
                    else
                    {
                        Logger.Error("No scopes matching: " + request.ScopesRequested.Aggregate((x, y) => x + ", " + y));
                        return new ApiResultDataModel() {
                            IsSuccess = false,
                            Message = "不存在" + client.ClientName + "授权域，无法完成授权",
                        };
                    }
                }
                else
                {
                    Logger.Error("Invalid client id:" + request.ClientId);
                    return new ApiResultDataModel()
                    {
                        IsSuccess = false,
                        Message = "无效的客户端Id:" + request.ClientId,
                    };
                }
            }
            else
            {
                Logger.Error("No consent request matching request:" + returnUrl);
                return new ApiResultDataModel()
                {
                    IsSuccess = false,
                    Message = "授权失败，请尝试重新登录",
                };
            }
        }

        /// <summary>
        /// 授权处理
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel>> ConsentHandle([FromBody] ConsentInputModel model)
        {
            ConsentResponse grantedConsent = null;

            // 验证返回网址仍然有效
            var request = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);
            if (request == null)
                return new ApiResultDataModel() { IsSuccess = false, Message = "无效的返回地址，请重新认证", RedirectHref = model.ReturnUrl };


            // 用户单击“否” - 发回标准的“access_denied”响应
            if (model.IsAgree == false)
            {
                grantedConsent = ConsentResponse.Denied;
                await HttpContext.SignOutAsync();

                await _interaction.GrantConsentAsync(request, grantedConsent);
                Uri uri = new Uri(request.RedirectUri);
                string url = $"{uri.Scheme}://{uri.Host}:{uri.Port}";

                return new ApiResultDataModel() { IsSuccess = true, RedirectHref = url };
            }
            // 用户单击“是” - 验证数据
            else if (model.IsAgree == true && model != null)
            {
                // 如果用户同意某个范围，则构建响应模型
                if (model.ScopesConsented != null && model.ScopesConsented.Any())
                {
                    var scopes = model.ScopesConsented;
                    if (ConsentOptions.EnableOfflineAccess == false)
                    {
                        scopes = scopes.Where(x => x != IdentityServer4.IdentityServerConstants.StandardScopes.OfflineAccess);
                    }

                    // 构建同意响应
                    grantedConsent = new ConsentResponse
                    {
                        RememberConsent = model.RememberConsent,
                        ScopesConsented = scopes.ToArray()
                    };
                }
                else
                {
                    return new ApiResultDataModel() { IsSuccess = false, Message = "未选择任何授权域" };
                }
            }
            else
            {
                return new ApiResultDataModel() { IsSuccess = false, Message = "无效的授权域" };
            }

            if (grantedConsent == null) {
                return new ApiResultDataModel() { IsSuccess = false, Message = "授权失败" };
            }

            // 将同意结果传达给身份服务器
            await _interaction.GrantConsentAsync(request, grantedConsent);

            // 表示可以重定向回授权端点
            return new ApiResultDataModel() { IsSuccess = true, RedirectHref = model.ReturnUrl };
        }

        private ConsentModel CreateConsentModel(
            string returnUrl,
            AuthorizationRequest request,
            Client client, 
            Resources resources)
        {
            var vm = new ConsentModel();

            //vm.RememberConsent = model?.RememberConsent ?? true;
            //vm.ScopesConsented = model?.ScopesConsented ?? Enumerable.Empty<string>();
            //vm.ReturnUrl = returnUrl;

            vm.ClientName = client.ClientName ?? client.ClientId;
            vm.ClientUrl = client.ClientUri;
            vm.ClientLogoUrl = client.LogoUri;
            vm.AllowRememberConsent = client.AllowRememberConsent;

            vm.IdentityScopes = resources.IdentityResources.Select(x => CreateScopeViewModel(x)).ToArray();
            vm.ResourceScopes = resources.ApiResources.SelectMany(x => x.Scopes).Select(x => CreateScopeViewModel(x)).ToArray();

            // 离线共享域
            if (ConsentOptions.EnableOfflineAccess && resources.OfflineAccess)
            {
                vm.ResourceScopes = vm.ResourceScopes.Union(new ScopeResourceModel[] {
                    GetOfflineAccessScope()
                });
            }

            return vm;
        }

        /// <summary>
        /// 生成身份域模型
        /// </summary>
        /// <param name="identity"></param>
        /// <returns></returns>
        private ScopeResourceModel CreateScopeViewModel(IdentityResource identity)
        {
            return new ScopeResourceModel
            {
                Name = identity.Name,
                DisplayName = identity.DisplayName,
                Description = identity.Description,
                Emphasize = identity.Emphasize,
                Required = identity.Required,
            };
        }

        /// <summary>
        /// 生成Api资源域模型
        /// </summary>
        /// <param name="scope"></param>
        /// <param name="check"></param>
        /// <returns></returns>
        private ScopeResourceModel CreateScopeViewModel(Scope scope)
        {
            return new ScopeResourceModel
            {
                Name = scope.Name,
                DisplayName = scope.DisplayName,
                Description = scope.Description,
                Emphasize = scope.Emphasize,
                Required = scope.Required,
            };
        }

        /// <summary>
        /// 离线共享域
        /// </summary>
        /// <param name="check"></param>
        /// <returns></returns>
        private ScopeResourceModel GetOfflineAccessScope()
        {
            return new ScopeResourceModel
            {
                Name = IdentityServer4.IdentityServerConstants.StandardScopes.OfflineAccess,
                DisplayName = ConsentOptions.OfflineAccessDisplayName,
                Description = ConsentOptions.OfflineAccessDescription,
                Emphasize = true,
            };
        }
    }
}