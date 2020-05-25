using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(ContentComponentData))]
    public class ContentComponentDataDto
    {
        public int Id { get; set; }

        public string Sign { get; set; }

        public List<SingleComponentDataDto> SingleDatas { get; set; }
    }
}
