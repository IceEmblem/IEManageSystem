using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Repositorys;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public class ExecLogicService : IExecLogicService
    {
        private IActuatorFactory _actuatorFactory { get; set; }

        private IRepository<PageBase> _pageRepository { get; set; }

        private IPageDataRepository _pageDataRepository { get; set; }

        private IEfRepository<ContentComponentData, int> _componentDataRepository { get; set; }

        public ExecLogicService(
            IActuatorFactory actuatorFactory,
            IRepository<PageBase> pageRepository,
            IPageDataRepository pageDataRepository,
            IEfRepository<ContentComponentData, int> componentDataRepository) 
        {
            _actuatorFactory = actuatorFactory;

            _pageRepository = pageRepository;

            _pageDataRepository = pageDataRepository;

            _componentDataRepository = componentDataRepository;
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
            Expression<Func<ContentComponentData, object>>[] propertySelectors = { 
                e=>e.SingleDatas
            };
            var componentData = _componentDataRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.PageDataId == pageData.Id && e.Sign == pageComponentBaseSign);

            actuator.Exec(componentData, pageBase.GetPageComponentForSign(contentComponentDataSign), pageData, request);
        }
    }
}
