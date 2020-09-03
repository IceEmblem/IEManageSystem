using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.PageComponents
{
    /// <summary>
    /// 页面组件基本设置
    /// </summary>
    public class PageComponentBaseSetting:ValueObject
    {
        public int SortIndex { get; set; }

        public string Width { get; set; }

        public string Height { get; set; }

        public string Padding { get; set; }

        public int? PaddingLeft { get; set; }

        public int? PaddingRight { get; set; }

        public int? PaddingTop { get; set; }

        public int? PaddingBottom { get; set; }

        public string Margin { get; set; }

        public int? MarginLeft { get; set; }

        public int? MarginRight { get; set; }

        public int? MarginTop { get; set; }

        public int? MarginBottom { get; set; }

        public string Border { get; set; }

        public string BorderRadius { get; set; }

        public string Position { get; set; }

        public string Left { get; set; }

        public string Right { get; set; }

        public string Top { get; set; }

        public string Bottom { get; set; }

        public string BackgroundColor { get; set; }

        public string BackgroundImage { get; set; }

        public string ClassName { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            return new List<object>();
        }
    }
}
