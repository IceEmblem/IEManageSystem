using Abp.Dependency;
using Abp.Domain.Repositories;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageComponents;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    public abstract class BaseActuator : IActuator
    {
        protected ContentComponentData CreateContentComponentData(string sign, PageData pageData) 
        {
            var componentDataRepository = IocManager.Instance.Resolve<IRepository<ComponentData>>();

            ContentComponentData contentComponentData = new ContentComponentData()
            {
                Sign = sign,
                PageData = pageData,
                SingleDatas = new List<SingleComponentData>()
            };

            componentDataRepository.Insert(contentComponentData);

            return contentComponentData;
        }

        public abstract void Exec(ContentComponentData componentData, PageComponent pageComponent, PageData pageData, PageBase page, User user, string request);
    }
}
