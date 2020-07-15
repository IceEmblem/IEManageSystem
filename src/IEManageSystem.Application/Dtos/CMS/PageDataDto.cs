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

        public string Describe { get; set; }

        public string Content { get; set; }

        public string Images { get; set; }

        public int Score { get; set; }

        public int ScoreNum { get; protected set; }

        public int Click { get; set; }

        public DateTime CreationTime { get; set; }

        public int PageId { get; set; }

        public List<TagDto> Tags { get; set; }
    }
}
