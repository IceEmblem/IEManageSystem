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

        public PageComponentBase GetPageComponentForSign(string sign) {
            return PageComponents.FirstOrDefault(e => e.Sign == sign);
        }

        [Required]
        public string Name { get; protected set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

        public ICollection<PageComponentBase> PageComponents { get; set; }

        public ICollection<PageData> PageDatas { get; protected set; }
    }
}
