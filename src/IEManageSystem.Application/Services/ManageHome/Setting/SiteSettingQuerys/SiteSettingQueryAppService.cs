using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using IEManageSystem.Common.DomainModel;
using IEManageSystem.Dtos.Common;
using IEManageSystem.Services.ManageHome.Setting.SiteSettingQuerys.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.Setting.SiteSettingQuerys
{
    public class SiteSettingQueryAppService: IEManageSystemAppServiceBase, ISiteSettingQueryAppService
    {
        private IRepository<SiteSetting> _repository { get; set; }

        private IObjectMapper _objectMapper { get; set; }

        public SiteSettingQueryAppService(IRepository<SiteSetting> repository,
            IObjectMapper objectMapper)
        {
            _repository = repository;

            _objectMapper = objectMapper;
        }

        public GetSiteSettingsOutput GetSiteSettings(GetSiteSettingsInput input)
        {
            var siteSettings = _repository.GetAll();

            return new GetSiteSettingsOutput() { SiteSettings = _objectMapper.Map<List<SiteSettingDto>>(siteSettings) };
        }
    }
}
