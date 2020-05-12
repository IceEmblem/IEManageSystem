using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Logics.Dto
{
    public class ExecLogicInput
    {
        public string LogicName { get; set; }

        public string PageName { get; }

        public string PageComponentBaseSign { get; set; }

        public string PageDataName { get; set; }

        public string ContentComponentDataSign { get; set; }

        public string Request { get; set; }
    }
}
