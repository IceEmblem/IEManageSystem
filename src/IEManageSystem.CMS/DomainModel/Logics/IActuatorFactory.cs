using Abp.Dependency;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public interface IActuatorFactory: ISingletonDependency
    {
        void Register(string name, string code);

        IActuator GetActuator(string name);
    }
}
