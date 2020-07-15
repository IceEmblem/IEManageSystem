using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(Tag))]
    public class TagDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }
    }
}
