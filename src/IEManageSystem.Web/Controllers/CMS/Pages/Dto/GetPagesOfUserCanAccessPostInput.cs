using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Controllers.CMS.Pages.Dto
{
    public class GetPagesOfUserCanAccessPostInput
    {
        /// <summary>
        /// false 为查询，true 为管理
        /// </summary>
        public bool QueryOrManage { get; set; }
    }
}
