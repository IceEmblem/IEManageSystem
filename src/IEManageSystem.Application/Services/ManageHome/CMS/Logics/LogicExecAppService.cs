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
    [ApiAuthorization(ApiScopeProvider.LogicExec)]
    public class LogicExecAppService : IEManageSystemAppServiceBase, ILogicExecAppService
    {
        private IExecLogicService _execLogicService { get; }

        private IRepository<PageBase> _pageRepository { get; set; }

        private IRepository<PageData> _pageDataRepository { get; set; }

        private IRepository<Logic> _logicRepository { get; set; }

        public LogicExecAppService(
            IExecLogicService execLogicService,
            IRepository<PageBase> pageRepository,
            IRepository<PageData> pageDataRepository,
            IRepository<Logic> logicRepository)
        {
            _execLogicService = execLogicService;
            _pageRepository = pageRepository;
            _pageDataRepository = pageDataRepository;
            _logicRepository = logicRepository;
        }

        public ExecLogicOutput ExecLogic(ExecLogicInput input)
        {
            Task<Logic> logicTask = _logicRepository.FirstOrDefaultAsync(e => e.Name == input.LogicName);
            Task<PageBase> pageTask = _pageRepository.FirstOrDefaultAsync(e => e.Name == input.PageName);
            Task<PageData> pageDataTask = _pageDataRepository.FirstOrDefaultAsync(e => e.Name == input.PageDataName);

            Task.WaitAll(logicTask, pageTask, pageDataTask);

            if (logicTask.Result == null)
            {
                throw new UserFriendlyException($"可执行逻辑{input.LogicName}不存在");
            }

            if (pageTask.Result == null)
            {
                throw new UserFriendlyException($"指定的页面{input.PageName}不存在");
            }

            if (pageDataTask.Result == null)
            {
                throw new UserFriendlyException($"指定的文章{input.PageDataName}不存在");
            }

            _execLogicService.Exec(logicTask.Result, pageTask.Result, input.PageComponentSign, pageDataTask.Result, input.ContentComponentDataSign, input.Request);

            return new ExecLogicOutput();
        }
    }
}
