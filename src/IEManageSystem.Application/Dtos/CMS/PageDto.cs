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

        public string Field1Name { get; set; }

        public string Field2Name { get; set; }

        public string Field3Name { get; set; }

        public string Field4Name { get; set; }

        public string Field5Name { get; set; }

        public EntityEditDto Creator { get; set; }

        public EntityEditDto LastUpdater { get; set; }

        /// <summary>
        /// StaticPage || ContentPage
        /// </summary>
        public string PageType { get; set; }

        public ContentPagePeimissionCollectionDto ContentPagePeimissionCollection { get; set; }

        public void SetStaticPage() => PageType = "StaticPage";

        public bool IsStaticPage() => PageType == "StaticPage";

        public void SetContentPage() => PageType = "ContentPage";

        public bool IsContentPage() => PageType == "ContentPage";

        public PageDto() { }
    }
}
