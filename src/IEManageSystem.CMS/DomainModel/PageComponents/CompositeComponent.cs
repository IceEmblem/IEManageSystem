using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageComponents
{
    public class CompositeComponent : PageComponentBase
    {
        public CompositeComponent(string name) : base(name)
        {
        }

        // 后端不在维护页面组件之间的关系
        //public ICollection<PageComponentBase> PageComponents { get; set; }
    }
}
