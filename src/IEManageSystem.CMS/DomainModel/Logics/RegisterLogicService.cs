using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Logics
{
    public class RegisterLogicService : IRegisterLogicService
    {
        private IActuatorFactory _actuatorFactory { get; }

        private IRepository<Logic> _repository { get; }

        public RegisterLogicService(IActuatorFactory actuatorFactory, IRepository<Logic> repository) 
        {
            _actuatorFactory = actuatorFactory;

            _repository = repository;
        }

        public void Register(string name, string code)
        {
            try
            {
                _actuatorFactory.Register(name, code);

                var logic = _repository.FirstOrDefault(e=>e.Name == name);

                if (logic == null)
                {
                    _repository.Insert(new Logic()
                    {
                        Name = name,
                        Code = code
                    });
                }
                else 
                {
                    logic.Code = code;
                }

            }
            catch (Exception e) 
            {
                throw new UserFriendlyException(e.Message);
            }
        }
    }
}
