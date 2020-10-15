using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Controllers.CMS.Logics.Dto
{
    public class ExecLogicInput
    {
        public string LogicName { get; set; }

        public string PageName { get; set; }

        public string PageDataName { get; set; }

        public string ContentComponentDataSign { get; set; }

        public string Request { get; set; }
    }
}
