using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Services.ManageHome.CMS.Logics.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.CMS.Logics
{
    [RemoteService(false)]
    public class LogicExecAppService : IEManageSystemAppServiceBase, ILogicExecAppService
    {
        private IExecLogicService _execLogicService { get; }

        private IRepository<Logic> _logicRepository { get; set; }

        public LogicExecAppService(
            IExecLogicService execLogicService,
            IRepository<Logic> logicRepository)
        {
            _execLogicService = execLogicService;
            _logicRepository = logicRepository;
        }

        public ExecLogicOutput ExecLogic(ExecLogicInput input)
        {
            Logic logic = _logicRepository.FirstOrDefault(e => e.Name == input.LogicName);

            if (logic == null)
            {
                throw new UserFriendlyException($"可执行逻辑{input.LogicName}未注册，请先进行注册");
            }

            _execLogicService.Exec(logic, input.PageName, input.PageComponentSign, input.PageDataName, input.ContentComponentDataSign, input.UserId, input.Request);

            return new ExecLogicOutput();
        }
    }
}
