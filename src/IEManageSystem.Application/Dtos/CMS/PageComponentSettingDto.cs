using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    public class PageComponentSettingDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public List<SingleSettingDataDto> SingleDatas { get; set; }
    }
}
