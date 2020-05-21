using Abp.UI;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class ContentPage : PageBase
    {
        public ContentPage(string name) : base(name)
        {
        }

        public void AddPageData(PageData pageData)
        {
            if (PageDatas.Any(item => item.Name == pageData.Name)) {
                throw new UserFriendlyException($"文章{pageData.Name}已存在，请重新命名");
            }

            PageDatas.Add(pageData);
        }
    }
}
