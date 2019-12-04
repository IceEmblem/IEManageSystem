using Abp.AutoMapper;
using Abp.Domain.Uow;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.CMS;

namespace IEManageSystem
{
    [DependsOn(
        typeof(IEManageSystemCoreModule),
        typeof(IEApiAuthorizationModule),
        typeof(IEManageSystemCMSModule),
        typeof(AbpAutoMapperModule))]
    public class IEManageSystemApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemApplicationModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IUnitOfWorkManager unitOfWorkManager = IocManager.Resolve<IUnitOfWorkManager>();

            using (var unitOfWork = unitOfWorkManager.Begin())
            {
                // 动态添加Api域
                ApiScopeManager apiScopeManager = IocManager.Resolve<ApiScopeManager>();

                new ApiScopeProvider().Register((name, displayName) =>
                {
                    apiScopeManager.Register(name, displayName);
                });

                unitOfWorkManager.Current.SaveChanges();

                unitOfWork.Complete();
            }
        }
    }
}