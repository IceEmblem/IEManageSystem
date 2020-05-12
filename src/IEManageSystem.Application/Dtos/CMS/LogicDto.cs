using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.Logics;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(Logic))]
    public class LogicDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }
    }
}
