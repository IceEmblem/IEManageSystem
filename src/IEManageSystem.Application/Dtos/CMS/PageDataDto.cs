using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(PageData))]
    public class PageDataDto
    {
        public int Id{ get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public List<ContentComponentDataDto> ContentComponentDatas { get; set; }
    }
}
