using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using Abp.UI;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Services.ManageHome.CMS.Logics.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Logics
{
    [ApiAuthorization(ApiScopeProvider.Logic)]
    public class LogicAppService : IEManageSystemAppServiceBase, ILogicAppService
    {
        private IRegisterLogicService _registerLogicService { get; }

        private IRepository<Logic> _logicRepository { get; set; }

        private IObjectMapper _objectMapper { get; }

        public LogicAppService(
            IRegisterLogicService registerLogicService,
            IRepository<Logic> logicRepository,
            IObjectMapper objectMapper) 
        {
            _registerLogicService = registerLogicService;
            _logicRepository = logicRepository;
            _objectMapper = objectMapper;
        }

        public GetLogicsOutput GetLogics(GetLogicsInput input)
        {
            var logics = _logicRepository.GetAllList();

            return new GetLogicsOutput() { 
                Logics = _objectMapper.Map<List<LogicDto>>(logics)
            };
        }

        public RegisterLogicOutput RegisterLogic(RegisterLogicInput input)
        {
            try
            {
                _registerLogicService.Register(input.Name, input.Code);
            }
            catch (Exception e) 
            { 
                throw new UserFriendlyException(e.Message);
            }

            return new RegisterLogicOutput();
        }
    }
}
