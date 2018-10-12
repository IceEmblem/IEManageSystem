using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto
{
    public class GetClientsInput
    {
        [Range(1, 9999)]
        public int PageIndex { get; set; }

        [Range(1, 9999)]
        public int PageSize { get; set; }
    }
}
