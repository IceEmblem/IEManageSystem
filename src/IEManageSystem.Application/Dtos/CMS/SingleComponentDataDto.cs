using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(SingleComponentData))]
    public class SingleComponentDataDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int SortIndex { get; set; }

        public string Field1 { get; set; }

        public string Field2 { get; set; }

        public string Field3 { get; set; }

        public string Field4 { get; set; }

        public string Field5 { get; set; }
    }
}
