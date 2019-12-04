using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto
{
    public class GetPageInput
    {
        // 通过 Id 或 Name 获取页面
        public int? Id { get; set; }

        public string Name { get; set; }
    }
}
