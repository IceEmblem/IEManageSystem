using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class PageLeafSetting : ValueObject
    {
        public string PageName { get; set; }

        public int PageSize { get; set; }

        public int Top { get; set; }

        public string SearchKey { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            return new List<object>()
            {
                PageName,
                PageSize,
                Top,
                SearchKey
            };
        }
    }
}
