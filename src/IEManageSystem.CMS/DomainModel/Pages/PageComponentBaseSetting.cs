using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    /// <summary>
    /// 页面组件基本设置
    /// </summary>
    public class PageComponentBaseSetting:ValueObject<PageComponentBaseSetting>
    {
        protected PageComponentBaseSetting() { }

        public PageComponentBaseSetting(int sortIndex, string col, string height, string padding, string margin, string backgroundColor, string className)
        {
            SortIndex = sortIndex;
            Col = col;
            Height = height;
            Padding = padding;
            Margin = margin;
            BackgroundColor = backgroundColor;
            ClassName = className;
        }

        public int SortIndex { get; protected set; }

        public string Col { get; protected set; }

        public string Height { get; protected set; }

        public string Padding { get; protected set; }

        public string Margin { get; protected set; }

        public string BackgroundColor { get; protected set; }

        public string ClassName { get; protected set; }
    }
}
