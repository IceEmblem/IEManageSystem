using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public interface IRegisterLogicService : IDomainService
    {
        void Register(string name, string code);
    }
}
