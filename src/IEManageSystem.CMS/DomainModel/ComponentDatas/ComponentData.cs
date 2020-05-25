using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.ComponentDatas
{
    public abstract class ComponentData : Entity
    {
        /// <summary>
        /// 组件标识
        /// </summary>
        public string Sign { get; set; }


        public ICollection<SingleComponentData> SingleDatas { get; set; }
    }
}
