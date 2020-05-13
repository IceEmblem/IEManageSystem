using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public class ExecLogicService : IExecLogicService
    {
        private IActuatorFactory _actuatorFactory { get; set; }

        private IRepository<PageBase> _pageRepository { get; set; }

        private IRepository<PageData> _pageDataRepository { get; set; }

        public ExecLogicService(
            IActuatorFactory actuatorFactory,
            IRepository<PageBase> pageRepository,
            IRepository<PageData> pageDataRepository) {
            _actuatorFactory = actuatorFactory;

            _pageRepository = pageRepository;

            _pageDataRepository = pageDataRepository;
        }

        public void Exec(
            Logic logic,
            PageBase pageBase,
            string pageComponentBaseSign,
            PageData pageData,
            string contentComponentDataSign,
            string request)
        {
            var actuator = _actuatorFactory.GetActuator(logic.Name);

            if (actuator == null) {
                try
                {
                    _actuatorFactory.Register(logic.Name, logic.Code);
                }
                catch (Exception e) 
                {
                    throw new UserFriendlyException(e.Message);
                }

                actuator = _actuatorFactory.GetActuator(logic.Name);
            }

            _pageRepository.EnsureCollectionLoaded(pageBase, e => e.PageComponents);
            _pageDataRepository.EnsureCollectionLoaded(pageData, e => e.ContentComponentDatas);

            actuator.Exec(pageData.GetComponentDataForSign(pageComponentBaseSign), pageBase.GetPageComponentForSign(contentComponentDataSign), pageData, request);
        }
    }
}
