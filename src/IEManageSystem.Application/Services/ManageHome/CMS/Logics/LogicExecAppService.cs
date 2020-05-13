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
    // [ApiAuthorization(ApiScopeProvider.LogicExec)]
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
            Logic logic = _logicRepository.FirstOrDefault(e => e.Name == input.LogicName);
            PageBase page = _pageRepository.FirstOrDefault(e => e.Name == input.PageName);
            PageData pageData = _pageDataRepository.FirstOrDefault(e => e.Name == input.PageDataName);

            if (logic == null)
            {
                throw new UserFriendlyException($"可执行逻辑{input.LogicName}未注册，请先进行注册");
            }

            if (page == null)
            {
                throw new UserFriendlyException($"指定的页面{input.PageName}不存在");
            }

            if (pageData == null)
            {
                throw new UserFriendlyException($"指定的文章{input.PageDataName}不存在");
            }

            _execLogicService.Exec(logic, page, input.PageComponentSign, pageData, input.ContentComponentDataSign, input.Request);

            return new ExecLogicOutput();
        }
    }
}
