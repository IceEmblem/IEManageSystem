using Abp.Domain.Entities;
using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class ContentPagePeimissionCollection : Entity
    {

        public ICollection<ContentPagePermission> ManagePermissions { get; set; }

        public bool IsEnableQueryPermission { get; set; }

        public ICollection<ContentPagePermission> QueryPermissions { get; set; }

        public int ContentPageId { get; set; }

        [ForeignKey("ContentPageId")]
        public ContentPage ContentPage { get; set; }
    }
}
