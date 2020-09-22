using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Linq;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public abstract class PageBase : Entity
    {
        public PageBase(string name)
        {
            Name = name;
        }

        [Required]
        public string Name { get; protected set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

        public string Field1Name { get; set; }

        public string Field2Name { get; set; }

        public string Field3Name { get; set; }

        public string Field4Name { get; set; }

        public string Field5Name { get; set; }

        public EntityEdit Creator { get; set; }

        public EntityEdit LastUpdater { get; set; }

        public string Discriminator { get; protected set; }
    }
}
