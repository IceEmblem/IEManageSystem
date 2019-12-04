using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.CMS.DomainModel
{
    public class CmsComponent:Entity
    {
        [Required]
        public string Name { get; set; }


    }
}
