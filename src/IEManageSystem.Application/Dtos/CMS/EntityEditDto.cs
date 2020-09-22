using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(EntityEdit))]
    public class EntityEditDto
    {
        public int EditorId { get; set; }

        public string Name { get; set; }

        public string HeadSculpture { get; set; }

        public DateTime Time { get; set; }
    }
}
