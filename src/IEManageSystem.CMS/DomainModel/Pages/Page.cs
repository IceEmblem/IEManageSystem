using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Linq;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class Page
    {
        public const string ContentPageDiscriminatorName = "ContentPage";

        public const string StaticPageDiscriminatorName = "StaticPage";

        protected Page() { }

        public Page(string name)
        {
            Name = name;
        }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

        public string Field1Name { get; set; }

        public string Field2Name { get; set; }

        public string Field3Name { get; set; }

        public string Field4Name { get; set; }

        public string Field5Name { get; set; }

        public EntityEdit Creator { get; set; }

        public EntityEdit LastUpdater { get; set; }

        public string Discriminator { get; set; }
    }
}
