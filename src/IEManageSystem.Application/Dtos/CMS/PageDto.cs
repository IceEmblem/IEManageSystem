using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(PageBase))]
    public class PageDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

        /// <summary>
        /// StaticPage || ContentPage
        /// </summary>
        public string PageType { get; set; }

        public IEnumerable<PageComponentDto> PageComponents { get; set; }
    }
}
